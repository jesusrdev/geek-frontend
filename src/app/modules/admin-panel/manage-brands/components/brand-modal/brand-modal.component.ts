import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose
} from '@angular/material/dialog';

import { Brand } from '../../../../../core/models/brand';

import { SharedService } from '../../../../../core/services/shared.service';
import { BrandService } from '../../../../../core/services/brand.service';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatFormField, MatLabel, MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/autocomplete';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'brand-modal',
  templateUrl: './brand-modal.component.html',
  styleUrl: './brand-modal.component.css',
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
export class BrandModalComponent implements OnInit {
  private modal = inject<MatDialogRef<BrandModalComponent>>(MatDialogRef);
  dataBrand = inject<Brand>(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder);
  private _brandService = inject(BrandService);
  private _sharedService = inject(SharedService);

  formBrand: FormGroup;
  title = 'Añadir';
  nameButton = 'Guardar';

  constructor() {
    this.formBrand = this.fb.group({
      nameBrand: ['', Validators.required],
      imageUrl: [null],
      status: ['1', Validators.required]
    });

    if (this.dataBrand != null) {
      this.title = 'Editar';
      this.nameButton = 'Actualizar';
    }
  }

  ngOnInit(): void {
    if (this.dataBrand != null) {
      this.formBrand.patchValue({
        nameBrand: this.dataBrand.nameBrand,
        // imageUrl: this.dataBrand.imageUrl,
        status: this.dataBrand.status ? '1' : '0'
      });
    }
  }

  saveBrand() {
    const formData = new FormData();

    // Agregar los campos necesarios al FormData
    formData.append('Id', this.dataBrand?.id ? this.dataBrand.id.toString() : '0'); // Enviar "0" si es una nueva marca
    formData.append('NameBrand', this.formBrand.value.nameBrand);
    formData.append('Status', this.formBrand.value.status);

    const file = this.formBrand.get('imageUrl')?.value; // Obtén el archivo desde el formulario
    if (file instanceof File) {
      // Asegúrate de que sea un objeto `File`
      formData.append('ImageUrl', file);
    } else {
      console.error('ImageUrl no es un archivo:', file);
    }

    if (this.dataBrand == null) {
      this._brandService.create(formData).subscribe({
        next: data => {
          if (data.isSuccessful) {
            this._sharedService.showAlert('La marca ha sido guardada con éxito', 'Completo');
            this.modal.close(true);
          } else {
            this._sharedService.showAlert('No se pudo crear la marca.', 'Error');
          }
        },
        error: e => {
          this._sharedService.showAlert(e.error.message, 'Error');
        }
      });
    } else {
      // Update Brand
      this._brandService.update(formData).subscribe({
        next: data => {
          if (data.isSuccessful) {
            this._sharedService.showAlert('La marca se actualizó con éxito.', 'Completo');
            this.modal.close(true);
          } else {
            this._sharedService.showAlert('No se pudo actualizar la marca', 'Error');
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
      const file = input.files[0];
      this.formBrand.patchValue({ imageUrl: file });
      this.formBrand.get('imageUrl')?.updateValueAndValidity();
    }
  }
}
