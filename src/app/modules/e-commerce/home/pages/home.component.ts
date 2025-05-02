import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../../../../core/models/product';
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
export class HomeComponent {
  products: Product[] = [];
  brands: Brand[] = [];

  constructor(
    private router: Router,
    private _sharedService: SharedService,
    private _brandService: BrandService,
    private _productService: ProductService
  ) {}

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
