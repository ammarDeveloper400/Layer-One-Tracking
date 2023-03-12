import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlogListingComponent } from './blog-listing.component';

@NgModule({
  imports: [RouterModule.forChild([{
    path: '',
    component: BlogListingComponent
  }])],
  exports: [RouterModule]
})
export class BlogListingRoutingModule {
}
