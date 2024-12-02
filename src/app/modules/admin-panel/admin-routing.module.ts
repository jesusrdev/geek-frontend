import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './manage-categories/pages/categories/categories.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    runGuardsAndResolvers: 'always',
    // canActivate: [authGuard],
    children: [
      {
        path: 'categories',
        component: CategoriesComponent,
        pathMatch: 'full',
      },
      // {
      //   path: 'specialties',
      //   component: ListSpecialtyComponent,
      //   pathMatch: 'full',
      // },
      // { path: 'doctors', component: ListDoctorComponent, pathMatch: 'full' },
      // { path: 'users', component: ListUserComponent, pathMatch: 'full' },
      { path: '**', redirectTo: 'admin', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
