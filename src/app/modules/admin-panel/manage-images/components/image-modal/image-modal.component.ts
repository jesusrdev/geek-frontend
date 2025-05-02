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

import { ImageProduct, Product } from '../../../../../core/models/product';

import { SharedService } from '../../../../../core/services/shared.service';
import { ImageService } from '../../../../../core/services/image.service';
import { ProductService } from '../../../../../core/services/product.service';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatFormField, MatLabel } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';

import { MatOption } from '@angular/material/autocomplete';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrl: './image-modal.component.css',
  imports: [
    MatDialogTitle,
    CdkScrollable,
    MatDialogContent,
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatDialogActions,
    MatButton,
    MatDialogClose
  ]
})
export class ImageModalComponent implements OnInit {
  formImage: FormGroup;
  title = 'Añadir';
  nameButton = 'Guardar';

  listProducts: Product[] = [];

  constructor(
    private modal: MatDialogRef<ImageModalComponent>,
    @Inject(MAT_DIALOG_DATA) public dataImage: ImageProduct,
    private fb: FormBuilder,
    private _imageService: ImageService,
    private _productService: ProductService,
    private _sharedService: SharedService
  ) {
    this.formImage = this.fb.group({
      productId: ['', Validators.required],
      imageUrl: [null]
    });

    if (this.dataImage != null) {
      this.title = 'Editar';
      this.nameButton = 'Actualizar';
    }

    _productService.listActive().subscribe({
      next: data => {
        if (data.isSuccessful) {
          this.listProducts = data.result;
        } else {
          this._sharedService.showAlert('No se encontraron productos', 'Advertencia');
        }
      },
      error: e => {
        this._sharedService.showAlert(e.error.message, 'Error!');
      }
    });
  }

  ngOnInit(): void {
    if (this.dataImage != null) {
      this.formImage.patchValue({
        productId: this.dataImage.productId
        // imageUrl: this.dataImage.imageUrl,
      });
    }
  }

  saveImage() {
    const formData = new FormData();

    // Agregar los campos necesarios al FormData
    const idProduct = this.formImage.value.productId;
    formData.append('idProduct', idProduct);

    const file = this.formImage.get('imageUrl')?.value; // Obtén el archivo desde el formulario
    if (file instanceof File) {
      // Asegúrate de que sea un objeto `File`
      formData.append('imageFile', file);
    } else {
      console.error('ImageUrl no es un archivo:', file);
    }

    this._imageService.create(idProduct, formData).subscribe({
      next: data => {
        if (data.isSuccessful) {
          this._sharedService.showAlert('La imagen ha sido guardada con éxito', 'Completo');
          this.modal.close(true);
        } else {
          this._sharedService.showAlert('No se pudo crear la imagen.', 'Error');
        }
      },
      error: e => {
        this._sharedService.showAlert(e.error.message, 'Error');
      }
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      this.formImage.patchValue({ imageUrl: file });
      this.formImage.get('imageUrl')?.updateValueAndValidity();
    }
  }
}
