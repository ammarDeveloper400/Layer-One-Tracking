import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MethodService } from 'src/app/shared/method.service';

@Injectable({
  providedIn: 'root',
})
export class BlogService implements OnDestroy {
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  // public fields
  isSave$ = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private methodService: MethodService) {}

  GetBlogs(displayLength: number, isPublish: string) {
    this.isSave$.next(true);
    return this.methodService
      .Get(
        `/client-blog/get-blogs?displayLength=${displayLength}&isPublish=${isPublish}`
      )
      .pipe(
        map((data) => {
          this.isSave$.next(false);
          return data;
        })
      );
  }

  GetBlog(code: string) {
    return this.methodService.Get('/client-blog/get-blog?code=' + code).pipe(
      map((data) => {
        return data;
      })
    );
  }

  GetBlogSetup(code: string) {
    return this.methodService.Get('/admin-blog/get-blog?code=' + code).pipe(
      map((data) => {
        return data;
      })
    );
  }

  UpdateBlogReadCount(code: string) {
    return this.methodService
      .Post('/client-blog/update-blog-read-count?code=' + code)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  AddBlog(blogData: FormData) {
    this.isSave$.next(true);
    return this.methodService.FormData('/client-blog/add-blog', blogData).pipe(
      map((data) => {
        return data;
      }),
      finalize(() => this.isSave$.next(false))
    );
  }

  UpdateBlog(blogData: FormData) {
    this.isSave$.next(true);
    return this.methodService
      .FormData('/client-blog/update-blog', blogData)
      .pipe(
        map((data) => {
          return data;
        }),
        finalize(() => this.isSave$.next(false))
      );
  }

  ShareBog(code: string)
  {
    return this.methodService.Post('/client-blog/share-blog?code=' + code).pipe(
      map((data) => {
        return data;
      })
    );
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
