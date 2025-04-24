import { Component, OnInit } from '@angular/core';
import { ShoppingCartItem } from '../../../core/models/shopping-cart';
import { ShoppingCartService } from '../../../core/services/shopping-cart.service';
import { Router } from '@angular/router';
import { SharedService } from '../../../core/services/shared.service';

@Component({
    selector: 'app-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styleUrl: './shopping-cart.component.css',
    standalone: false
})
export class ShoppingCartComponent implements OnInit {
  cartItems: ShoppingCartItem[] = [];
  totalPrice: number = 0;

  constructor(
    private cartService: ShoppingCartService,
    private router: Router,
    private _sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems(): void {
    this.cartService.list().subscribe({
      next: response => {
        if (response.isSuccessful) {
          this.cartItems = response.result;
          this.totalPrice = response.result.reduce(
            (acc, item) => acc + item.price * (1 - item.product.discount) * item.quantity,
            0
          );
        }
      },
      error: error => {
        this._sharedService.showAlert(JSON.stringify(error.error), 'Error!');
      }
    });
  }

  removeCartItem(itemId: number): void {
    this.cartService.delete(itemId).subscribe({
      next: response => {
        if (response.isSuccessful) {
          this.getCartItems();
        }
      },
      error: error => {
        this._sharedService.showAlert(JSON.stringify(error.error), 'Error!');
      }
    });
  }

  checkout(): void {
    this.router.navigate(['/checkout']);
  }
}
