import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './manage-categories/pages/categories/categories.component';
import { BrandsComponent } from './manage-brands/pages/brands.component';
import { SubcategoriesComponent } from './manage-subcategories/pages/subcategories.component';
import { ProductsComponent } from './manage-products/pages/products.component';
import { ImagesComponent } from './manage-images/pages/images.component';

export default [
  {
    path: '',
    component: DashboardComponent,
    runGuardsAndResolvers: 'always',
    // canActivate: [authGuard],
    children: [
      {
        path: 'categories',
        component: CategoriesComponent,
        pathMatch: 'full'
      },
      {
        path: 'brands',
        component: BrandsComponent,
        pathMatch: 'full'
      },
      {
        path: 'subcategories',
        component: SubcategoriesComponent,
        pathMatch: 'full'
      },
      { path: 'products', component: ProductsComponent, pathMatch: 'full' },
      {
        path: 'images',
        component: ImagesComponent,
        pathMatch: 'full'
      },
      // { path: 'users', component: ListUserComponent, pathMatch: 'full' },
      { path: '**', redirectTo: 'admin', pathMatch: 'full' }
    ]
  }
] as Routes;
