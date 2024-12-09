import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../../../../core/models/product';
import { Category } from '../../../../core/models/category';

import { SharedService } from '../../../../core/services/shared.service';
import { CategoryService } from '../../../../core/services/category.service';
import { ProductService } from '../../../../core/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  products: Product[] = [];
  categories: Category[] = [];

  constructor(
    private router: Router,
    private _sharedService: SharedService,
    private _categoryService: CategoryService,
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

  getCategories() {
    this._categoryService.list().subscribe({
      next: data => {
        if (data.isSuccessful) {
          this.categories = data.result;
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
    this.getCategories();
  }
}
