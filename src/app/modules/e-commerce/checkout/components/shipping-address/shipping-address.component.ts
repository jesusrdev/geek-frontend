import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { ShippingAddress } from '../../../../../core/models/shipping-address';
import { ShippingAddressService } from '../../../../../core/services/shipping-address.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { NgClass } from '@angular/common';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatDialogClose } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { SharedService } from '../../../../../core/services/shared.service';

@Component({
  selector: 'checkout-shipping-address',
  templateUrl: './shipping-address.component.html',
  imports: [
    MatIcon,
    ReactiveFormsModule,
    NgClass,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    MatDialogClose,
    MatIconButton
  ],
  styleUrl: './shipping-address.component.css'
})
export class ShippingAddressComponent {
  shippingAddresService = inject(ShippingAddressService);
  private fb = inject(FormBuilder);
  private sharedService = inject(SharedService);

  shippingAddresses = signal<ShippingAddress[]>([]);

  shippingAddressId = input<number>(0);
  onSelect = output<number>();

  ngOnInit(): void {
    this.getShippingAddresses();
  }

  formShippingAddress: FormGroup = this.fb.group({
    address: ['', [Validators.required]],
    city: ['', [Validators.required]],
    country: ['Perú', [Validators.required]],
    state: [1, [Validators.required]],
    zipCode: ['', [Validators.required]]
  });

  defaultShippingAddress: ShippingAddress = {
    id: 0,
    address: '',
    city: '',
    country: 'Perú',
    state: '',
    zipCode: '',
    userName: ''
  };

  selectedShippingAddress = signal<ShippingAddress>(this.defaultShippingAddress);

  title = signal('Dirección de envio');
  nameButton = signal('Guardar');
  isOpen = signal(false);

  getShippingAddresses() {
    this.shippingAddresService.getMyShippingAddress().subscribe({
      next: data => {
        if (data.isSuccessful) {
          this.shippingAddresses.set(data.result);
        } else {
          console.log('No se encontraron direcciones de envio');
        }
      },
      error: error => {
        console.log('Error al obtener direcciones de envio');
      }
    });
  }

  reload() {
    this.getShippingAddresses();
  }

  selectShippingAddress(e: Event, shippingAddress: ShippingAddress, type: 'edit' | 'create' | 'delete') {
    e.stopPropagation();

    if (type === 'create') {
      this.selectedShippingAddress.set(this.defaultShippingAddress);
    } else if (type === 'edit') {
      this.selectedShippingAddress.set(shippingAddress);
      this.formShippingAddress.patchValue({
        address: shippingAddress.address,
        city: shippingAddress.city,
        country: shippingAddress.country,
        zipCode: shippingAddress.zipCode
      });
    } else {
      this.selectedShippingAddress.set(shippingAddress);
    }
    this.isOpen.set(true);
  }

  submitShippingAddress() {
    if (this.formShippingAddress.invalid) {
      this.formShippingAddress.markAllAsTouched();
      console.log('Formulario inválido', this.formShippingAddress.errors);
      return;
    }

    const request: ShippingAddress = {
      id: this.selectedShippingAddress().id,
      address: this.formShippingAddress.value.address!,
      city: this.formShippingAddress.value.city!,
      country: this.formShippingAddress.value.country!,
      state: this.formShippingAddress.value.state!,
      zipCode: this.formShippingAddress.value.zipCode!,
      userName: ''
    };

    if (this.selectedShippingAddress().id > 0) {
      // Actualizar dirección de envío
      this.shippingAddresService.update(request).subscribe({
        next: result => {
          if (result.isSuccessful) {
            this.isOpen.set(false);
            this.reload();
            this.formShippingAddress.reset();
          } else {
            this.sharedService.showAlert(result.message, 'Error!');
          }
        },
        error: error => {
          this.sharedService.showAlert(JSON.stringify(error.error), 'Error!');
        }
      });
    } else {
      // Crear nueva dirección de envío
      this.shippingAddresService.create(request).subscribe({
        next: result => {
          if (result.isSuccessful) {
            this.isOpen.set(false);
            this.reload();
            this.formShippingAddress.reset();
          } else {
            this.sharedService.showAlert(result.message, 'Error!');
          }
        },
        error: error => {
          this.sharedService.showAlert(JSON.stringify(error.error), 'Error!');
        }
      });
    }
  }

  deleteShippingAddress(e: Event, id: number): void {
    e.stopPropagation();

    Swal.fire({
      title: '¿Estás seguro?',
      text: `Estás seguro que quieres eliminar la dirección de envio?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, eliminar',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No'
    }).then(result => {
      if (result.isConfirmed) {
        this.shippingAddresService.changeStatus(id).subscribe({
          next: result => {
            if (result.isSuccessful) {
              this.reload();
              this.sharedService.showAlert('Dirección de envío eliminada con éxito', 'Éxito!');
            } else {
              this.sharedService.showAlert(result.message, 'Error!');
            }
          },
          error: error => {
            this.sharedService.showAlert(JSON.stringify(error.error), 'Error!');
          }
        });
      }
    });
  }

  close(e: Event): void {
    e.stopPropagation();
    this.isOpen.set(false);
    this.formShippingAddress.reset();
  }
}
