import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BlogSetupComponent } from './blog-setup.component';
import { BlogSetupRoutingModule } from './blog-setup-routing.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BlogSetupRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    InlineSVGModule,
    NgbModule,
    CKEditorModule,
  ],
  declarations: [
    BlogSetupComponent
  ]
})
export class AdminBlogSetupModule { }