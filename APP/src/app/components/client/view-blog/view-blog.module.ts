import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewBlogRoutingModule } from './view-blog-routing.module';
import { ViewBlogComponent } from './view-blog.component';
import { AdsenseModule } from 'ng2-adsense';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ViewBlogRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    InlineSVGModule,
    NgbModule,
    AdsenseModule.forRoot()
  ],
  declarations: [
    ViewBlogComponent 
  ]
})
export class ViewBlogModule { }