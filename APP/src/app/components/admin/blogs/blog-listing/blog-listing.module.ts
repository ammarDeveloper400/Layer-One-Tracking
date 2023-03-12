import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BlogListingRoutingModule } from './blog-listing-routing.module';
import { BlogListingComponent } from './blog-listing.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BlogListingRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    InlineSVGModule,
    NgbModule,
    NgApexchartsModule
  ],
  declarations: [
    BlogListingComponent
  ]
})
export class AdminBlogListingModule { }