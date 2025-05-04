import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { ProductList } from '../../../../core/models/product';
import { Brand } from '../../../../core/models/brand';

import { SharedService } from '../../../../core/services/shared.service';
import { BrandService } from '../../../../core/services/brand.service';
import { ProductService } from '../../../../core/services/product.service';
import { HeroComponent } from '../components/hero/hero.component';
import { BrandsComponent } from '../components/brands/brands.component';
import { BestSellersComponent } from '../components/best-sellers/best-sellers.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [HeroComponent, BrandsComponent, BestSellersComponent]
})
export default class HomeComponent {
  private router = inject(Router);
  private _sharedService = inject(SharedService);
  private _brandService = inject(BrandService);
  private _productService = inject(ProductService);

  products: ProductList[] = [];
  brands: Brand[] = [];

  getProducts() {
    this._productService.listActive().subscribe({
      next: data => {
        if (data.isSuccessful) {
          this.products = data.result;
        } else {
          this._sharedService.showAlert('No se encontraron productos', 'Advertencia');
        }
      },
      error: e => {
        this._sharedService.showAlert(e.error.message, 'Error!');
      }
    });
  }

  getBrands() {
    this._brandService.listActive().subscribe({
      next: data => {
        if (data.isSuccessful) {
          this.brands = data.result;
        } else {
          this._sharedService.showAlert('No se encontraron categorías', 'Advertencia');
        }
      },
      error: e => {
        this._sharedService.showAlert(e.error.message, 'Error!');
      }
    });
  }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
  }
}
