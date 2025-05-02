import { Routes } from '@angular/router';

import DashboardComponent from './dashboard/dashboard.component';

export default [
  {
    path: '',
    component: DashboardComponent,
    runGuardsAndResolvers: 'always',
    // canActivate: [authGuard],
    children: [
      {
        path: 'categories',
        loadComponent: () => import('./manage-categories/pages/categories/categories.component'),
        pathMatch: 'full'
      },
      {
        path: 'brands',
        loadComponent: () => import('./manage-brands/pages/brands.component'),
        pathMatch: 'full'
      },
      {
        path: 'subcategories',
        loadComponent: () => import('./manage-subcategories/pages/subcategories.component'),
        pathMatch: 'full'
      },
      {
        path: 'products',
        loadComponent: () => import('./manage-products/pages/products.component'),
        pathMatch: 'full'
      },
      {
        path: 'images',
        loadComponent: () => import('./manage-images/pages/images.component'),
        pathMatch: 'full'
      },
      // { path: 'users', component: ListUserComponent, pathMatch: 'full' },
      { path: '**', redirectTo: 'admin', pathMatch: 'full' }
    ]
  }
] as Routes;
