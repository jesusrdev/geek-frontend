import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Brand } from '../../../../../core/models/brand';
import { Product } from '../../../../../core/models/product';
import { Category } from '../../../../../core/models/category';
import { Subcategory } from '../../../../../core/models/subcategory';

import { SharedService } from '../../../../../core/services/shared.service';
import { BrandService } from '../../../../../core/services/brand.service';
import { ProductService } from '../../../../../core/services/product.service';
import { CategoryService } from '../../../../../core/services/category.service';
import { SubcategoryService } from '../../../../../core/services/subcategory.service';

@Component({
  selector: 'product-modal',
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.css'
})
export class ProductModalComponent implements OnInit {
  formProduct: FormGroup;
  title = 'Añadir';
  nameButton = 'Guardar';

  listCategories: Category[] = [];
  listSubcategories: Subcategory[] = [];
  listBrands: Brand[] = [];

  constructor(
    private modal: MatDialogRef<ProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public dataProduct: Product,
    private fb: FormBuilder,
    private _productService: ProductService,
    private _brandService: BrandService,
    private _categoryService: CategoryService,
    private _subcategoryService: SubcategoryService,
    private _sharedService: SharedService
  ) {
    this.formProduct = this.fb.group({
      nameProduct: ['', Validators.required],
      description: ['', Validators.required],
      largeDescription: ['', Validators.required],
      price: ['0.00', Validators.required],
      stock: ['0', Validators.required],
      discount: ['0.00', Validators.required],
      categoryId: ['', Validators.required],
      brandId: ['', Validators.required],
      subcategoryId: ['', Validators.required],
      images: [null],
      status: ['1', Validators.required]
    });

    if (this.dataProduct != null) {
      this.title = 'Editar';
      this.nameButton = 'Actualizar';
    }
  }

  ngOnInit(): void {
    if (this.dataProduct != null) {
      this.formProduct.patchValue({
        nameProduct: this.dataProduct.nameProduct,
        description: this.dataProduct.description,
        largeDescription: this.dataProduct.largeDescription,
        price: this.dataProduct.price,
        stock: this.dataProduct.stock,
        discount: this.dataProduct.discount,
        categoryId: this.dataProduct.categoryId,
        brandId: this.dataProduct.brandId,
        subcategoryId: this.dataProduct.subCategoryId,
        // imageUrl: this.dataProduct.imageUrl,
        status: this.dataProduct.status ? '1' : '0'
      });
    }

    this._categoryService.listActive().subscribe({
      next: data => {
        if (data.isSuccessful) {
          this.listCategories = data.result;
        } else {
          this._sharedService.showAlert('No se encontraron categorías', 'Advertencia');
        }
      },
      error: e => {
        this._sharedService.showAlert(e.error.message, 'Error!');
      }
    });

    this._subcategoryService.listActive().subscribe({
      next: data => {
        if (data.isSuccessful) {
          this.listSubcategories = data.result;
        } else {
          this._sharedService.showAlert('No se encontraron subcategorías', 'Advertencia');
        }
      },
      error: e => {
        this._sharedService.showAlert(e.error.message, 'Error!');
      }
    });

    this._brandService.listActive().subscribe({
      next: data => {
        if (data.isSuccessful) {
          this.listBrands = data.result;
        } else {
          this._sharedService.showAlert('No se encontraron marcas', 'Advertencia');
        }
      },
      error: e => {
        this._sharedService.showAlert(e.error.message, 'Error!');
      }
    });
  }

  saveProduct() {
    const formData = new FormData();

    // Agregar los campos necesarios al FormData
    formData.append('Id', this.dataProduct?.id ? this.dataProduct.id.toString() : '0'); // Enviar "0" si es una nueva marca
    formData.append('NameProduct', this.formProduct.value.nameProduct);
    formData.append('Description', this.formProduct.value.description);
    formData.append('LargeDescription', this.formProduct.value.largeDescription);
    formData.append('Price', this.formProduct.value.price);
    formData.append('Stock', this.formProduct.value.stock);
    formData.append('Discount', this.formProduct.value.discount);
    formData.append('CategoryId', this.formProduct.value.categoryId);
    formData.append('BrandId', this.formProduct.value.brandId);
    formData.append('SubcategoryId', this.formProduct.value.subcategoryId);
    formData.append('Status', this.formProduct.value.status);

    const files = this.formProduct.get('images')?.value;
    if (files && files.length > 0) {
      files.forEach((file: File) => {
        formData.append('Images', file);
      });
    } else {
      console.error('No se seleccionaron imágenes.');
    }

    console.log(formData);

    if (this.dataProduct == null) {
      this._productService.create(formData).subscribe({
        next: data => {
          if (data.isSuccessful) {
            this._sharedService.showAlert('El producto ha sido guardado con éxito', 'Completo');
            this.modal.close(true);
          } else {
            this._sharedService.showAlert('No se pudo crear el producto.', 'Error');
          }
        },
        error: e => {
          this._sharedService.showAlert(e.error.message, 'Error');
        }
      });
    } else {
      // Update Product
      this._productService.update(formData).subscribe({
        next: data => {
          if (data.isSuccessful) {
            this._sharedService.showAlert('El producto se actualizó con éxito.', 'Completo');
            this.modal.close(true);
          } else {
            this._sharedService.showAlert('No se pudo actualizar el producto', 'Error');
          }
        },
        error: e => {
          this._sharedService.showAlert(e.error.message, 'Error');
        }
      });
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const files = [];
      for (let i = 0; i < input.files.length; i++) {
        files.push(input.files[i]);
      }
      this.formProduct.patchValue({ images: files });
      this.formProduct.get('images')?.updateValueAndValidity();
      console.log(files); // Verifica que los archivos estén siendo capturados correctamente
    }
  }
}
