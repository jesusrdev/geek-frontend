import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/pages/home.component';
import { ProductsComponent } from './products/pages/products.component';
import { ProductDetailComponent } from './product-detail/pages/product-detail.component';
import { SignUpComponent } from '../auth/sign-up/sign-up.component';
import { LoginComponent } from '../auth/login/login.component';

import {} from '../auth/auth.module';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { authGuard } from '../../core/guards/auth.guard';

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
      },
      {
        path: 'products',
        component: ProductsComponent,
        pathMatch: 'full'
      },
      {
        path: 'products/:id',
        component: ProductDetailComponent
      },
      {
        path: 'shopping-cart',
        component: ShoppingCartComponent,
        pathMatch: 'full',
        canActivate: [authGuard]
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
        pathMatch: 'full',
        canActivate: [authGuard]
      },
      {
        path: 'my-orders',
        component: MyOrdersComponent,
        pathMatch: 'full',
        canActivate: [authGuard]
      },
      {
        path: 'favorites',
        component: FavoritesComponent,
        pathMatch: 'full',
        canActivate: [authGuard]
      }
      // { path: '**', redirectTo: '', pathMatch: 'full' },
    ]
  },
  {
    path: 'auth',
    component: LayoutComponent,
    runGuardsAndResolvers: 'always',
    // canActivate: [authGuard],
    children: [
      {
        path: 'sign-up',
        component: SignUpComponent,
        pathMatch: 'full'
        // canActivate: [authGuard],
      },
      {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full'
        // canActivate: [authGuard],
      }
      // {
      //   path: 'profile',
      //   component: ProfileComponent,
      //   pathMatch: 'full'
      // },
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EcommerceRoutingModule {}
