import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/pages/home.component';
import { ProductsComponent } from './products/pages/products.component';
import { ProductDetailComponent } from './product-detail/pages/product-detail.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    runGuardsAndResolvers: 'always',
    // canActivate: [authGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
        // canActivate: [authGuard],
      },
      {
        path: 'products',
        component: ProductsComponent,
        pathMatch: 'full'
        // canActivate: [authGuard],
      },
      {
        path: 'products/:id',
        component: ProductDetailComponent
      }
      // { path: '**', redirectTo: '', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EcommerceRoutingModule {}
