import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {Category} from '../../../../../core/models/category';

import {SharedService} from '../../../../../core/services/shared.service';
import {CategoryService} from '../../../../../core/services/category.service';

@Component({
  selector: 'category-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit {
  formCategory: FormGroup;
  title: string = 'Añadir';
  nameButton: string = 'Guardar';

  constructor(
    private modal: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public dataCategory: Category,
    private fb: FormBuilder,
    private _categoryService: CategoryService,
    private _sharedService: SharedService
  ) {
    this.formCategory = this.fb.group({
      nameCategory: ['', Validators.required],
      status: ['1', Validators.required],
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
        status: this.dataCategory.estatus.toString(),
      });
    }
  }

  saveCategory() {
    const category: Category = {
      id: this.dataCategory?.id ?? 0,
      nameCategory: this.formCategory.value.nameCategory,
      estatus: parseInt(this.formCategory.value.status),
    };

    if (this.dataCategory == null) {
      // Create new Specialty
      this._categoryService.create(category).subscribe({
        next: (data) => {
          if (data.isSuccessful) {
            this._sharedService.showAlert(
              'La categoría ha sido guardada con éxito',
              'Completo'
            );
            this.modal.close(true);
          } else {
            this._sharedService.showAlert(
              'No se pudo crear la categoría.',
              'Error'
            );
          }
        },
        error: (e) => {
          this._sharedService.showAlert(e.error.message, 'Error');
        },
      });
    } else {
      // Update Specialty
      this._categoryService.update(category).subscribe({
        next: (data) => {
          if (data.isSuccessful) {
            this._sharedService.showAlert(
              'La categoría se actualizó con éxito.',
              'Completo'
            );
            this.modal.close(true);
          } else {
            this._sharedService.showAlert(
              'No se pudo actualizar la categoría',
              'Error'
            );
          }
        },
        error: (e) => {
          this._sharedService.showAlert(e.error.message, 'Error');
        },
      });
    }
  }
}
