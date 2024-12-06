import { AdminRoutingModule } from './admin-routing.module';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material/material.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './manage-categories/pages/categories/categories.component';
import { CategoryListComponent } from './manage-categories/components/list/list.component';
import { CategoryModalComponent } from './manage-categories/components/modal/modal.component';
import { BrandsComponent } from './manage-brands/pages/brands.component';
import { BrandListComponent } from './manage-brands/components/list/list.component';

import { CategoryService } from '../../core/services/category.service';
import { BrandService } from '../../core/services/brand.service';
import { BrandModalComponent } from './manage-brands/components/brand-modal/brand-modal.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CategoriesComponent,
    CategoryListComponent,
    CategoryModalComponent,
    BrandsComponent,
    BrandListComponent,
    BrandModalComponent
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule, MaterialModule],
  providers: [CategoryService, BrandService],
  exports: [DashboardComponent]
})
export class AdminPanelModule {}
