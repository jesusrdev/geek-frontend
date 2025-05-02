import { Routes } from '@angular/router';

import LayoutComponent from './layout/layout.component';

import { authGuard } from '../../core/guards/auth.guard';

export default [
  {
    path: '',
    component: LayoutComponent,
    runGuardsAndResolvers: 'always',
    // canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./home/pages/home.component'),
        pathMatch: 'full'
      },
      {
        path: 'products',
        loadComponent: () => import('./products/pages/products.component'),
        pathMatch: 'full'
      },
      {
        path: 'products/:id',
        loadComponent: () => import('./product-detail/pages/product-detail.component')
      },
      {
        path: 'shopping-cart',
        loadComponent: () => import('./shopping-cart/shopping-cart.component'),
        pathMatch: 'full',
        canActivate: [authGuard]
      },
      {
        path: 'checkout',
        loadComponent: () => import('./checkout/checkout.component'),
        pathMatch: 'full',
        canActivate: [authGuard]
      },
      {
        path: 'my-orders',
        loadComponent: () => import('./my-orders/my-orders.component'),
        pathMatch: 'full',
        canActivate: [authGuard]
      },
      {
        path: 'favorites',
        loadComponent: () => import('./favorites/favorites.component'),
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
        loadComponent: () => import('../auth/sign-up/sign-up.component'),
        pathMatch: 'full'
        // canActivate: [authGuard],
      },
      {
        path: 'login',
        loadComponent: () => import('../auth/login/login.component'),
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
] as Routes;
