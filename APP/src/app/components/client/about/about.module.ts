import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AboutRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    InlineSVGModule,
    NgbModule,
  ],
  declarations: [
    AboutComponent 
  ]
})
export class AboutModule { }