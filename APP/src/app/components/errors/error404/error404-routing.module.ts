import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Error404Component } from './error404.component';

@NgModule({
  imports: [RouterModule.forChild([{
    path: '',
    component: Error404Component
  }])],
  exports: [RouterModule]
})
export class Error404RoutingModule {
}
