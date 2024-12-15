import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from '../../../../core/models/product';
import { Brand } from '../../../../core/models/brand';
import { Category } from '../../../../core/models/category';
import { Subcategory } from '../../../../core/models/subcategory';

import { SharedService } from '../../../../core/services/shared.service';
import { ProductService } from '../../../../core/services/product.service';
import { CategoryService } from '../../../../core/services/category.service';
import { BrandService } from '../../../../core/services/brand.service';
import { SubcategoryService } from '../../../../core/services/subcategory.service';

@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  brands: Brand[] = [];
  categories: Category[] = [];
  subcategories: Subcategory[] = [];

  filterParams: any = {};
  brandsId: number[] = [];
  categoriesId: number[] = [];
  subcategoriesId: number[] = [];
  query: string = '';
  orderBy: number = 0;
  page: number = 1;
  total: number = 0;

  readonly panelOpenState = signal(false);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _sharedService: SharedService,
    private _productService: ProductService,
    private _categoryService: CategoryService,
    private _brandService: BrandService,
    private _subcategoryService: SubcategoryService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.filterParams = params;
      // this.query = this.filterParams.get('query');
      // this.orderBy = this.filterParams.get('orderBy');
      this.brands = this.filterParams.get('brands');
      // this.categories = this.filterParams.get('categories');
      // this.subcategories = this.filterParams.get('subcategories');
      // Aquí puedes usar los parámetros de filtrado para cargar los productos filtrados
      this.getProducts();
      this.getBrands();
      this.getCategories();
      this.getSubcategories();
    });
  }

  getProducts() {
    this._productService
      .filter(this.query, this.orderBy, this.page, this.brandsId, this.categoriesId, this.subcategoriesId)
      .subscribe({
        next: data => {
          if (data.isSuccessful) {
            this.products = data.result;
            this.total = this.products.length;
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
          this._sharedService.showAlert('No se encontraron marcas', 'Advertencia');
        }
      },
      error: e => {
        this._sharedService.showAlert(e.error.message, 'Error!');
      }
    });
  }

  getCategories() {
    this._categoryService.listActive().subscribe({
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

  getSubcategories() {
    this._subcategoryService.listActive().subscribe({
      next: data => {
        if (data.isSuccessful) {
          this.subcategories = data.result;
        } else {
          this._sharedService.showAlert('No se encontraron subcategorías', 'Advertencia');
        }
      },
      error: e => {
        this._sharedService.showAlert(e.error.message, 'Error!');
      }
    });
  }
}
