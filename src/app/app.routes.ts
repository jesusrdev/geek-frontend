import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/e-commerce/ecommerce.routes')
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin-panel/admin.routes'),
    canActivate: [authGuard]
  },
  // {
  //   path: 'auth',
  //   loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  // },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
