import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Error404RoutingModule } from './error404-routing.module';
import { Error404Component } from './error404.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Error404RoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    Error404Component
  ]
})
export class Error404Module { }