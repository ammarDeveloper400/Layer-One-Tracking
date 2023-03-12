import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    InlineSVGModule,
    NgbModule,
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule { }