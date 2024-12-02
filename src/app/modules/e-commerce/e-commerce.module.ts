import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcommerceRoutingModule } from './ecommerce-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../shared/material/material.module';
import { HomeComponent } from './home/pages/home.component';
import { LayoutComponent } from './layout/layout.component';
import { ProductComponent } from './product/pages/product.component';



@NgModule({
  declarations: [
    HomeComponent,
    LayoutComponent,
    ProductComponent,
  ],
  imports: [
    CommonModule,
    EcommerceRoutingModule,
    SharedModule,
    MaterialModule,
  ],
  exports: [HomeComponent],
})
export class ECommerceModule { }
