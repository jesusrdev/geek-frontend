import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/e-commerce/e-commerce.module').then(m => m.ECommerceModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin-panel/admin-panel.module').then(m => m.AdminPanelModule),
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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
