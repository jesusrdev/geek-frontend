import { Component, OnInit, inject } from '@angular/core';
import { ShoppingCartItem } from '../../../core/models/shopping-cart';
import { ShoppingCartService } from '../../../core/services/shopping-cart.service';
import { Router } from '@angular/router';
import { SharedService } from '../../../core/services/shared.service';
import { OrderService } from '../../../core/services/order.service';
import { DecimalPipe } from '@angular/common';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
  imports: [ButtonComponent, DecimalPipe]
})
export default class CheckoutComponent implements OnInit {
  private cartService = inject(ShoppingCartService);
  private orderService = inject(OrderService);
  private router = inject(Router);
  private _sharedService = inject(SharedService);

  cartItems: ShoppingCartItem[] = [];
  total: number = 0;

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems(): void {
    this.cartService.list().subscribe({
      next: response => {
        if (response.isSuccessful) {
          this.cartItems = response.result;
          this.total = response.result.reduce(
            (acc, item) => acc + item.price * (1 - (item.product.discount || 0)) * item.quantity,
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
        console.log('Checkout created successfully');
      },
      error: err => {
        alert('Error al realizar la compra');
      }
    });
  }
}
