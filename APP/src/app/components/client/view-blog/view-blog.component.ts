import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, first } from 'rxjs';
import { BlogListDto } from 'src/app/models/blog/blog-listing.model';
import { BlogService } from 'src/app/services/blog/blog.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.scss'],
})
export class ViewBlogComponent implements OnInit {
  defaultImageSrc = environment.defaultImageUrl;
  blogId: string = '';
  blogEmitter$ = new BehaviorSubject<BlogListDto>(null);
  blogDto: BlogListDto;
  sameUserReachedEnd: boolean = true;
  apiURL: string = environment.apiUrl;
  linkBlog: string = '';
  adClient: string = environment.adClientId;
  adSlot: any = environment.adSlot;

  constructor(
    private activatedRoute: ActivatedRoute,
    public blogService: BlogService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.blogId = this.activatedRoute.snapshot.queryParamMap.get('code') || '';

    if(!this.blogId || this.blogId == undefined)this.router.navigate(['/']);
    
    if (this.blogId) {
      this.GetBlog();
    }
  }

  GetBlog() {
    this.blogService
      .GetBlog(this.blogId)
      .pipe(first())
      .subscribe({
        next: (data) => {
          this.blogEmitter$.next(data.data);
          this.blogEmitter$.subscribe((parameter) => {
            this.blogDto = parameter;
          });
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  UpdateBlogReadCount() {
    debugger
    const localBlogId = localStorage.getItem('isBlogRead_'+this.blogId);
    if(localBlogId && localBlogId == this.blogId) return;

    this.blogService
      .UpdateBlogReadCount(this.blogId)
      .pipe(first())
      .subscribe({
        next: (data) => {
          debugger
          localStorage.setItem('isBlogRead_'+this.blogId, this.blogId);
        },
        error: (error) => {
          console.log(error);
        },
      });
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

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let pos =
      (document.documentElement.scrollTop || document.body.scrollTop) +
      document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    if (pos >= max - 10 && this.sameUserReachedEnd) {
      this.sameUserReachedEnd = false;
      this.UpdateBlogReadCount();
    }
  }
}
