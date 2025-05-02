import { Component, OnInit, inject, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { Product } from '../../../../../core/models/product';

import { SharedService } from '../../../../../core/services/shared.service';
import { ShoppingCartService } from '../../../../../core/services/shopping-cart.service';
import { WishlistService } from '../../../../../core/services/wishlist.service';
import { DecimalPipe, PercentPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../../../shared/components/button/button.component';

@Component({
  selector: 'product-description',
  templateUrl: './description.component.html',
  styleUrl: './description.component.css',
  imports: [FormsModule, ButtonComponent, DecimalPipe, PercentPipe]
})
export class DescriptionComponent implements OnInit {
  private shoppingCartService = inject(ShoppingCartService);
  private wishlistService = inject(WishlistService);
  private _sharedService = inject(SharedService);

  readonly product = input<Product>({} as Product);
  readonly productDescription = input<SafeHtml>('');

  quantity: number = 1;

  ngOnInit(): void {}

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    this.shoppingCartService
      .create({
        id: this.product().id,
        productId: this.product().id,
        quantity: this.quantity
      })
      .subscribe({
        next: response => {
          if (response.isSuccessful) {
            this._sharedService.showAlert('Producto agregado al carrito', 'Exito!');
          } else {
            this._sharedService.showAlert('Error al agregar al carrito', 'Error!');
          }
        },
        error: error => {
          this._sharedService.showAlert(JSON.stringify(error.error), 'Error!');
        }
      });
  }

  addToWishlist() {
    this.wishlistService
      .create({
        id: this.product().id,
        productId: this.product().id,
        nameUser: '',
        nameProduct: this.product().nameProduct
      })
      .subscribe({
        next: response => {
          if (response.isSuccessful) {
            this._sharedService.showAlert('Producto agregado a la lista de deseos', 'Exito!');
          } else {
            this._sharedService.showAlert('Error al agregar a la lista de deseos', 'Error!');
          }
        },
        error: error => {
          this._sharedService.showAlert(JSON.stringify(error.error), 'Error!');
        }
      });
  }
}
