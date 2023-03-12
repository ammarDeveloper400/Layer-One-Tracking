import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, first } from 'rxjs';
import { BlogListDto } from 'src/app/models/blog/blog-listing.model';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-blog-listing',
  templateUrl: './blog-listing.component.html',
  styleUrls: ['./blog-listing.component.scss'],
})
export class BlogListingComponent implements OnInit {
  blogListEmitter$ = new BehaviorSubject<BlogListDto[]>([]);
  timeout: any = null;
  defaultListingCount = 10000;
  chartOptions: any = {};

  constructor(
    private router: Router,
    private toastr: ToastrService,
    public adminService: AdminService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('userEmail');
    if (!token) {
      this.router.navigate(['login']);
    }

    this.GetBlogs(this.defaultListingCount, '');
  }

  GetBlogs(displayLength: number, searchText: string) {
    this.adminService
      .GetBlogs(displayLength, searchText)
      .pipe(first())
      .subscribe({
        next: (data) => {
          this.blogListEmitter$.next(data.data);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  DeleteBlog(code: string) {
    var elBtn = document.getElementsByClassName('delete-btn-' + code)[0];
    elBtn.classList.add('no_display');
    var elLoader = document.getElementsByClassName('delete-loader-' + code)[0];
    elLoader.classList.remove('no_display');
    var elBtnClk = document.getElementsByClassName('delete-btnclk-' + code)[0];
    elBtnClk.classList.add('btn_disable');

    this.adminService
      .DeleteBlog(code)
      .pipe(first())
      .subscribe({
        next: (data) => {
          if (data.status) {
            this.GetBlogs(this.defaultListingCount, '');
            this.toastr.success(data.message);
            elLoader.classList.add('no_display');
            elBtn.classList.remove('no_display');
            elBtnClk.classList.remove('btn_disable');
          }
        },
        error: (error) => {
          this.toastr.error(error.error.message);
          elLoader.classList.add('no_display');
          elBtn.classList.remove('no_display');
          elBtnClk.classList.remove('btn_disable');
        },
      });
  }

  PublishToggle(code: string) {
    var elBtn = document.getElementsByClassName('reset-btn-' + code)[0];
    elBtn.classList.add('no_display');
    var elLoader = document.getElementsByClassName('reset-loader-' + code)[0];
    elLoader.classList.remove('no_display');
    var elBtnClk = document.getElementsByClassName('reset-btnclk-' + code)[0];
    elBtnClk.classList.add('btn_disable');

    this.adminService
      .PublishToggle(code)
      .pipe(first())
      .subscribe({
        next: (data) => {
          if (data.status) {
            this.GetBlogs(this.defaultListingCount, '');
            this.toastr.success(data.message);
            elLoader.classList.add('no_display');
            elBtn.classList.remove('no_display');
            elBtnClk.classList.remove('btn_disable');
          }
        },
        error: (error) => {
          this.toastr.error(error.error.message);
          elLoader.classList.add('no_display');
          elBtn.classList.remove('no_display');
          elBtnClk.classList.remove('btn_disable');
        },
      });
  }

  public onKeySearch(event: any) {
    clearTimeout(this.timeout);
    this.GetBlogs(this.defaultListingCount, event.target.value);
    this.timeout = setTimeout(function () {
      if (event.keyCode != 13) {
      }
    }, 1000);
  }
}


