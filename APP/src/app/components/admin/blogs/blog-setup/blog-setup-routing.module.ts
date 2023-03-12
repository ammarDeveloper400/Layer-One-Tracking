import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlogSetupComponent } from './blog-setup.component';

@NgModule({
  imports: [RouterModule.forChild([{
    path: '',
    component: BlogSetupComponent
  }])],
  exports: [RouterModule]
})
export class BlogSetupRoutingModule {
}
