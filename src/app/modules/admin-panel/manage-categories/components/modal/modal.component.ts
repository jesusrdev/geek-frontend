import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose
} from '@angular/material/dialog';

import { Category } from '../../../../../core/models/category';

import { SharedService } from '../../../../../core/services/shared.service';
import { CategoryService } from '../../../../../core/services/category.service';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatFormField, MatLabel, MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/autocomplete';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'category-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  imports: [
    MatDialogTitle,
    CdkScrollable,
    MatDialogContent,
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatSelect,
    MatOption,
    MatDialogActions,
    MatButton,
    MatDialogClose
  ]
})
export class CategoryModalComponent implements OnInit {
  formCategory: FormGroup;
  title = 'Añadir';
  nameButton = 'Guardar';

  constructor(
    private modal: MatDialogRef<CategoryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public dataCategory: Category,
    private fb: FormBuilder,
    private _categoryService: CategoryService,
    private _sharedService: SharedService
  ) {
    this.formCategory = this.fb.group({
      nameCategory: ['', Validators.required],
      status: ['1', Validators.required]
    });

    if (this.dataCategory != null) {
      this.title = 'Editar';
      this.nameButton = 'Actualizar';
    }
  }

  ngOnInit(): void {
    if (this.dataCategory != null) {
      this.formCategory.patchValue({
        nameCategory: this.dataCategory.nameCategory,
        status: this.dataCategory.status.toString()
      });
    }
  }

  saveCategory() {
    const category: Category = {
      id: this.dataCategory?.id ?? 0,
      nameCategory: this.formCategory.value.nameCategory,
      status: parseInt(this.formCategory.value.status)
    };

    if (this.dataCategory == null) {
      // Create new Category
      this._categoryService.create(category).subscribe({
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
      // Update Category
      this._categoryService.update(category).subscribe({
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
