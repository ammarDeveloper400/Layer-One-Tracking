import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, first } from 'rxjs';
import { BlogListDto } from 'src/app/models/blog/blog-listing.model';
import { BlogService } from 'src/app/services/blog/blog.service';
import { environment } from 'src/environments/environment';
import { LayoutService } from '../../shared';

@Component({
  selector: 'app-blog-listing',
  templateUrl: './blog-listing.component.html',
  styleUrls: ['./blog-listing.component.scss'],
})
export class BlogListingComponent implements OnInit {
  contentContainerClasses = '';
  defaultImageSrc = environment.defaultImageUrl;
  blogListEmitter$ = new BehaviorSubject<BlogListDto[]>([]);
  isSave$ = new BehaviorSubject<boolean>(false);
  displayLength: number = 4;
  disableButton: boolean = false;
  apiURL: string = environment.apiUrl;
  blogDto: BlogListDto;
  linkBlog: string = '';
  noRecord: boolean = false;
  adClient: string = environment.adClientId;
  adSlot: any = environment.adSlot;

  constructor(public blogService: BlogService, private layout: LayoutService, 
    private toastr: ToastrService,) {
    this.isSave$ = this.blogService.isSave$;
  }

  ngOnInit(): void {
    this.contentContainerClasses =
      this.layout.getStringCSSClasses('contentContainer');
    this.GetBlogs(this.displayLength);
  }

  GetBlogs(displayLength: number) {
    this.blogService
      .GetBlogs(displayLength, '1')
      .pipe(first())
      .subscribe({
        next: (data) => {
          debugger
          if(data.data.latestBlog.id != 0)
          {
            this.blogDto = data.data.latestBlog;
            this.disableButton = data.data.latestBlog?.disableButton;
            this.blogListEmitter$.next(data.data.blogList);
          }
          else{
            this.noRecord = true;
          }
          
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  MoreBlogs() {
    this.displayLength = this.displayLength + 3;
    this.GetBlogs(this.displayLength);
  }

  ShareBog(code: string)
  {
    var elBtn = document.getElementsByClassName('delete-btn-' + code)[0];
    elBtn.classList.add('no_display');
    var elLoader = document.getElementsByClassName('delete-loader-' + code)[0];
    elLoader.classList.remove('no_display');
    var elBtnClk = document.getElementsByClassName('delete-btnclk-' + code)[0];
    elBtnClk.classList.add('btn_disable');

    this.blogService
      .ShareBog(code)
      .pipe(first())
      .subscribe({
        next: (data) => {
          if(data.status)
          {
            this.linkBlog = data.data;
            this.CopyBlogLink();
            this.toastr.success("Link copied, Now you can share it");
          }
          elLoader.classList.add('no_display');
            elBtn.classList.remove('no_display');
            elBtnClk.classList.remove('btn_disable');
        },
        error: (error) => {
          this.toastr.error(error.error.message);
          elLoader.classList.add('no_display');
          elBtn.classList.remove('no_display');
          elBtnClk.classList.remove('btn_disable');
        },
      });
  }

  CopyBlogLink() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.linkBlog;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  onImgError(event) {
    event.target.src = this.defaultImageSrc;
  }
}
