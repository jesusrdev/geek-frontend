import { AdminRoutingModule } from './admin-routing.module';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material/material.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { CategoryService } from '../../core/services/category.service';
import { BrandService } from '../../core/services/brand.service';
import { SubcategoryService } from '../../core/services/subcategory.service';
import { ProductService } from '../../core/services/product.service';
import { ImageService } from '../../core/services/image.service';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { ProductsComponent } from './manage-products/pages/products.component';
import { ProductModalComponent } from './manage-products/components/product-modal/product-modal.component';
import { ProductListComponent } from './manage-products/components/product-list/product-list.component';
import { ImagesComponent } from './manage-images/pages/images.component';
import { ImageListComponent } from './manage-images/components/image-list/image-list.component';
import { ImageModalComponent } from './manage-images/components/image-modal/image-modal.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './manage-categories/pages/categories/categories.component';
import { CategoryListComponent } from './manage-categories/components/list/list.component';
import { CategoryModalComponent } from './manage-categories/components/modal/modal.component';
import { BrandsComponent } from './manage-brands/pages/brands.component';
import { BrandListComponent } from './manage-brands/components/list/list.component';
import { BrandModalComponent } from './manage-brands/components/brand-modal/brand-modal.component';
import { SubcategoriesComponent } from './manage-subcategories/pages/subcategories.component';
import { SubcategoryListComponent } from './manage-subcategories/components/subcategory-list/subcategory-list.component';
import { SubcategoryModalComponent } from './manage-subcategories/components/subcategory-modal/subcategory-modal.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CategoriesComponent,
    CategoryListComponent,
    CategoryModalComponent,
    BrandsComponent,
    BrandListComponent,
    BrandModalComponent,
    SubcategoriesComponent,
    SubcategoryListComponent,
    SubcategoryModalComponent,
    ProductsComponent,
    ProductModalComponent,
    ProductListComponent,
    ImagesComponent,
    ImageListComponent,
    ImageModalComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MaterialModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [CategoryService, BrandService, SubcategoryService, ProductService, ImageService],
  exports: [DashboardComponent]
})
export class AdminPanelModule {}
