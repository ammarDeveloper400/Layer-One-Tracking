import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MethodService } from 'src/app/shared/method.service';
import { UserModel } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService implements OnDestroy {
  isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private methodService: MethodService) {}

  Login(loginData: UserModel) {
    this.isLoading$.next(true);
    return this.methodService.Post('/auth/signin', loginData).pipe(
      map((data) => {
        if (data.status) {
          localStorage.setItem('userEmail', data.data);
        }
        return data;
      }),
      finalize(() => this.isLoading$.next(false))
    );
  }

  GetBlogs(displayLength: number, searchText: string) {
    this.isLoading$.next(true);
    return this.methodService
      .Get(
        `/admin-blog/get-blogs?displayLength=${displayLength}&searchText=${searchText}`
      )
      .pipe(
        map((data) => {
          return data;
        }),
        finalize(() => this.isLoading$.next(false))
      );
  }

  DeleteBlog(code: string) {
    return this.methodService
      .Post(`/client-blog/delete-blog?code=${code}`)
      .pipe(
        map((data) => {
          return data;
        }),
        finalize(() => this.isLoading$.next(false))
      );
  }

  PublishToggle(code: string) {
    return this.methodService
      .Post(`/client-blog/publish-toggle-blog?code=${code}`)
      .pipe(
        map((data) => {
          return data;
        }),
        finalize(() => this.isLoading$.next(false))
      );
  }

  GetGraphData(initialDaysCount: number){
    return this.methodService
      .Get(
        `/admin-blog/get-graph-data?initialDaysCount=${initialDaysCount}`
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  ngOnDestroy() {}
}
