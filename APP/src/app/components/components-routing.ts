import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: 'view-blog',
    loadChildren: () =>
      import('./client/view-blog/view-blog.module').then((m) => m.ViewBlogModule),
  },
  {
    path: 'articles',
    loadChildren: () =>
      import('./client/article/article.module').then((m) => m.ArticleModule),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./client/about/about.module').then((m) => m.AboutModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./client/blog-listing/blog-listing.module').then((m) => m.BlogListingModule),
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
