import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
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
    styleUrls: ['./products.component.css'],
    standalone: false
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  brands: Brand[] = [];
  categories: Category[] = [];
  subcategories: Subcategory[] = [];

  filterForm: FormGroup;
  total: number = 0;
  pageSize: number = 12;
  page: number = 1;

  panelOpenState = true; // Abierto por defecto

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private _sharedService: SharedService,
    private _productService: ProductService,
    private _categoryService: CategoryService,
    private _brandService: BrandService,
    private _subcategoryService: SubcategoryService
  ) {
    this.filterForm = this.fb.group({
      query: [''],
      orderBy: [0],
      brands: this.fb.array([]),
      categories: this.fb.array([]),
      subcategories: this.fb.array([])
    });
  }

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
      formArray.push(this.fb.control(id));
    } else {
      const index = formArray.controls.findIndex(x => x.value === id);
      formArray.removeAt(index);
    }
  }
}
