import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('../app/components/admin/auth/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('../app/components/admin/blogs/shared/shared.module').then((m) => m.AdminSharedModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('../app/components/shared/shared.module').then((m) => m.SharedModule),
  },
  { path: '**', 
  loadChildren: () =>
  import('../app/components/errors/error404/error404.module').then((m) => m.Error404Module)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
