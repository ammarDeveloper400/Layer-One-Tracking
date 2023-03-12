import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArticleRoutingModule } from './article-routing.module';
import { ArticleComponent } from './article.component';
import { AdsenseModule } from 'ng2-adsense';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ArticleRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    InlineSVGModule,
    NgbModule,
    AdsenseModule.forRoot()
  ],
  declarations: [
    ArticleComponent 
  ]
})
export class ArticleModule { }