import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Product, ProductList } from '../../../../core/models/product';
import { Brand } from '../../../../core/models/brand';
import { Category } from '../../../../core/models/category';
import { Subcategory } from '../../../../core/models/subcategory';

import { SharedService } from '../../../../core/services/shared.service';
import { ProductService } from '../../../../core/services/product.service';
import { CategoryService } from '../../../../core/services/category.service';
import { BrandService } from '../../../../core/services/brand.service';
import { SubcategoryService } from '../../../../core/services/subcategory.service';

import { MatFormField, MatInput, MatLabel, MatSuffix } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/autocomplete';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';

import { MatCheckbox } from '@angular/material/checkbox';
import { ProductCardComponent } from '../../../../shared/components/product-card/product-card.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatInput,
    MatIconButton,
    MatSuffix,
    MatIcon,
    MatButton,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatCheckbox,
    ProductCardComponent,
    MatPaginator
  ]
})
export default class ProductsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private _sharedService = inject(SharedService);
  private _productService = inject(ProductService);
  private _categoryService = inject(CategoryService);
  private _brandService = inject(BrandService);
  private _subcategoryService = inject(SubcategoryService);

  products: Product[] = [];
  brands: Brand[] = [];
  categories: Category[] = [];
  subcategories: Subcategory[] = [];

  total: number = 0;
  pageSize: number = 12;
  page: number = 1;

  filterForm: FormGroup = this.fb.group({
    query: [''],
    orderBy: [0],
    brands: [[]],
    categories: [[]],
    subcategories: [[]]
  });

  panelOpenState = true; // Abierto por defecto

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.filterForm.patchValue({
        query: params.get('query') || '',
        orderBy: +params.get('orderBy')! || 0,
        brands: params.getAll('brandsId').map(Number) || [],
        categories: params.getAll('categoriesId').map(Number) || [],
        subcategories: params.getAll('subcategoriesId').map(Number) || []
      });
      this.page = 1;

      this.getProducts();
      this.getBrands();
      this.getCategories();
      this.getSubcategories();
    });

    this.filterForm.valueChanges.subscribe(() => {
      this.page = 1;
      this.getProducts();
    });
  }

  getProducts() {
    const { query, orderBy, brands, categories, subcategories } = this.filterForm.value;
    this._productService.filter(query, orderBy, this.page, brands, categories, subcategories, this.pageSize).subscribe({
      next: data => {
        if (data.isSuccessful) {
          this.products = data.result;
          this.total = data.total || data.result.length; // Obtener el total del servicio
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

  toggleSideNav() {
    this.panelOpenState = !this.panelOpenState;
  }

  onPageChange(event: any) {
    this.page = event.pageIndex + 1;
    this.getProducts();
  }

  onCheckboxChange(event: any, controlName: string, id: number) {
    const formArray = this.filterForm.get(controlName) as FormArray;
    if (event.checked) {
      formArray.setValue([...formArray.value, id]);
    } else {
      const index = formArray.value.indexOf(id);
      formArray.setValue([...formArray.value.slice(0, index), ...formArray.value.slice(index + 1)]);
    }
    console.table(this.filterForm.value);
  }

  convertToProductList(product: Product): ProductList {
    return ProductService.convertToProductList(product);
  }
}
