import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Category } from '../../../../../core/models/category';
import { Subcategory } from '../../../../../core/models/subcategory';

import { SharedService } from '../../../../../core/services/shared.service';
import { SubcategoryService } from '../../../../../core/services/subcategory.service';
import { CategoryService } from '../../../../../core/services/category.service';

@Component({
  selector: 'app-subcategory-modal',
  templateUrl: './subcategory-modal.component.html',
  styleUrl: './subcategory-modal.component.css'
})
export class SubcategoryModalComponent implements OnInit {
  formSubcategory: FormGroup;
  title = 'Añadir';
  nameButton = 'Guardar';

  listCategories: Category[] = [];

  constructor(
    private modal: MatDialogRef<SubcategoryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public dataSubcategory: Subcategory,
    private fb: FormBuilder,
    private _subcategoryService: SubcategoryService,
    private _categoryService: CategoryService,
    private _sharedService: SharedService
  ) {
    this.formSubcategory = this.fb.group({
      nameSubcategory: ['', Validators.required],
      categoryId: ['', Validators.required],
      status: ['1', Validators.required]
    });

    if (this.dataSubcategory != null) {
      this.title = 'Editar';
      this.nameButton = 'Actualizar';
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
  }

  ngOnInit(): void {
    if (this.dataSubcategory != null) {
      this.formSubcategory.patchValue({
        nameSubcategory: this.dataSubcategory.nameSubcategory,
        categoryId: this.dataSubcategory.categoryId,
        status: this.dataSubcategory.estatus.toString()
      });
    }
  }

  saveSubcategory() {
    const subcategory: Subcategory = {
      id: this.dataSubcategory?.id ?? 0,
      nameSubcategory: this.formSubcategory.value.nameSubcategory,
      categoryId: this.formSubcategory.value.categoryId,
      estatus: parseInt(this.formSubcategory.value.status)
    };

    if (this.dataSubcategory == null) {
      // Create new Subcategory
      this._subcategoryService.create(subcategory).subscribe({
        next: data => {
          if (data.isSuccessful) {
            this._sharedService.showAlert('La categoría ha sido guardada con éxito', 'Completo');
            this.modal.close(true);
          } else {
            this._sharedService.showAlert('No se pudo crear la categoría.', 'Error');
          }
        },
        error: e => {
          this._sharedService.showAlert(e.error.message, 'Error');
        }
      });
    } else {
      // Update Subcategory
      this._subcategoryService.update(subcategory).subscribe({
        next: data => {
          if (data.isSuccessful) {
            this._sharedService.showAlert('La categoría se actualizó con éxito.', 'Completo');
            this.modal.close(true);
          } else {
            this._sharedService.showAlert('No se pudo actualizar la categoría', 'Error');
          }
        },
        error: e => {
          this._sharedService.showAlert(e.error.message, 'Error');
        }
      });
    }
  }
}
