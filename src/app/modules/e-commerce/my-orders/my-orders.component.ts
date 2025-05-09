import { Component, OnInit, inject } from '@angular/core';
import { Order } from '../../../core/models/order';
import { OrderService } from '../../../core/services/order.service';
import { SharedService } from '../../../core/services/shared.service';
import { DecimalPipe, DatePipe, NgClass } from '@angular/common';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css',
  imports: [DecimalPipe, DatePipe, ButtonComponent, NgClass]
})
export default class MyOrdersComponent implements OnInit {
  private ordersService = inject(OrderService);
  private sharedService = inject(SharedService);

  orders: Order[] = [];

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.ordersService.list().subscribe({
      next: response => {
        if (response.isSuccessful) {
          this.orders = response.result;
        } else {
          this.sharedService.showAlert('No se encontraron pedidos', 'Advertencia');
        }
      },
      error: error => {
        this.sharedService.showAlert(JSON.stringify(error.error), 'Error!');
      }
    });
  }

  payOrder(sessionId?: string): void {
    try {
      this.ordersService.redirectToCheckout(sessionId).then(() => {
        this.sharedService.showAlert('Redirigiendo al checkout', 'Exito!');
      });
    } catch (error) {
      this.sharedService.showAlert('Error al redireccionar al checkout', 'Error!');
    }
  }

  getDaysLeft(requiredDate: string, orderDate: string): number {
    const requiredDateObj = new Date(requiredDate);
    const orderDateObj = new Date(orderDate);
    const diff = requiredDateObj.getTime() - orderDateObj.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days;
  }
}
