import { AdminRoutingModule } from './admin-routing.module';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material/material.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './manage-categories/pages/categories/categories.component';

@NgModule({
  declarations: [DashboardComponent, CategoriesComponent],
  imports: [CommonModule, AdminRoutingModule, SharedModule, MaterialModule],
  exports: [DashboardComponent],
})
export class AdminPanelModule {}
