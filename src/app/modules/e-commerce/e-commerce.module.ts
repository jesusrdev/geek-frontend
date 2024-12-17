import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcommerceRoutingModule } from './ecommerce-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../shared/material/material.module';

import { CategoryService } from '../../core/services/category.service';
import { BrandService } from '../../core/services/brand.service';
import { SubcategoryService } from '../../core/services/subcategory.service';
import { ProductService } from '../../core/services/product.service';
import { ImageService } from '../../core/services/image.service';
import { AuthService } from '../../core/services/auth.service';

import { HomeComponent } from './home/pages/home.component';
import { LayoutComponent } from './layout/layout.component';
import { ProductsComponent } from './products/pages/products.component';
import { NavbarComponent } from './layout/components/navbar/navbar.component';
import { FooterComponent } from './layout/components/footer/footer.component';
import { HeroComponent } from './home/components/hero/hero.component';
import { BrandsComponent } from './home/components/brands/brands.component';
import { BestSellersComponent } from './home/components/best-sellers/best-sellers.component';
import { ProductDetailComponent } from './product-detail/pages/product-detail.component';
import { DescriptionComponent } from './product-detail/components/description/description.component';
import { ProductsSuggestedComponent } from './product-detail/components/products-suggested/products-suggested.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
  declarations: [
    HomeComponent,
    LayoutComponent,
    ProductsComponent,
    NavbarComponent,
    FooterComponent,
    HeroComponent,
    BrandsComponent,
    BestSellersComponent,
    ProductDetailComponent,
    DescriptionComponent,
    ProductsSuggestedComponent,
    ShoppingCartComponent,
    CheckoutComponent
  ],
  imports: [CommonModule, EcommerceRoutingModule, SharedModule, MaterialModule],
  providers: [CategoryService, BrandService, SubcategoryService, ProductService, ImageService, AuthService],
  exports: [HomeComponent, LayoutComponent]
})
export class ECommerceModule {}
