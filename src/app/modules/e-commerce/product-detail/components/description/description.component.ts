import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { Product } from '../../../../../core/models/product';

import { SharedService } from '../../../../../core/services/shared.service';
import { ShoppingCartService } from '../../../../../core/services/shopping-cart.service';
import { WishlistService } from '../../../../../core/services/wishlist.service';

@Component({
  selector: 'product-description',
  templateUrl: './description.component.html',
  styleUrl: './description.component.css'
})
export class DescriptionComponent implements OnInit {
  @Input() product: Product = {} as Product;
  @Input() productDescription: SafeHtml = '';

  quantity: number = 1;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private wishlistService: WishlistService,
    private _sharedService: SharedService
  ) {}

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
        id: this.product.id,
        productId: this.product.id,
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
        id: this.product.id,
        productId: this.product.id,
        nameUser: '',
        nameProduct: this.product.nameProduct
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
