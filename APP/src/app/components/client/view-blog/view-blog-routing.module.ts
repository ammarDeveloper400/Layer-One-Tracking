import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ViewBlogComponent } from './view-blog.component';

@NgModule({
  imports: [RouterModule.forChild([{
    path: '',
    component: ViewBlogComponent
  }])],
  exports: [RouterModule]
})
export class ViewBlogRoutingModule {
}
