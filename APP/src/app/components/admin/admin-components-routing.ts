import { Routes } from '@angular/router';

const AdminRouting: Routes = [
  
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./blogs/blog-listing/blog-listing.module').then((m) => m.AdminBlogListingModule),
  },
  {
    path: 'blog-setup',
    loadChildren: () =>
      import('./blogs/blog-setup/blog-setup.module').then((m) => m.AdminBlogSetupModule),
  },
  {
    path: 'analytics',
    loadChildren: () =>
      import('./analytics/analytics.module').then((m) => m.AnalyticsModule),
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { AdminRouting };
