import {AdminRoutingModule} from './admin-routing.module';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../../shared/material/material.module';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';

import {DashboardComponent} from './dashboard/dashboard.component';
import {CategoriesComponent} from './manage-categories/pages/categories/categories.component';

import {CategoryService} from '../../core/services/category.service';
import { ListComponent } from './manage-categories/components/list/list.component';
import { ModalComponent } from './manage-categories/components/modal/modal.component';

@NgModule({
  declarations: [DashboardComponent, CategoriesComponent, ListComponent, ModalComponent],
  imports: [CommonModule, AdminRoutingModule, SharedModule, MaterialModule],
  providers: [
    CategoryService,
  ],
  exports: [DashboardComponent],
})
export class AdminPanelModule {
}
