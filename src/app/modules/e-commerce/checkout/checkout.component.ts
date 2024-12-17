import { Component, OnInit } from '@angular/core';
import { ShoppingCartItem } from '../../../core/models/shopping-cart';
import { ShoppingCartService } from '../../../core/services/shopping-cart.service';
import { Router } from '@angular/router';
import { SharedService } from '../../../core/services/shared.service';
import { OrderService } from '../../../core/services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  cartItems: ShoppingCartItem[] = [];
  total: number = 0;

  constructor(
    private cartService: ShoppingCartService,
    private orderService: OrderService,
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
          this.total = response.result.reduce(
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

  completeCheckout(): void {
    this.orderService.create().subscribe({
      next: response => {
        if (response.isSuccessful) {
          alert('Compra realizada con éxito');
          this.router.navigate(['/']);
        } else {
          alert('Error al realizar la compra');
        }
      },
      error: err => {
        alert('Error al realizar la compra');
      }
    });
  }
}
