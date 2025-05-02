import { Component, OnInit } from '@angular/core';
import { Order } from '../../../core/models/order';
import { OrderService } from '../../../core/services/order.service';
import { SharedService } from '../../../core/services/shared.service';
import { DecimalPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css',
  imports: [DecimalPipe, DatePipe]
})
export class MyOrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(
    private ordersService: OrderService,
    private sharedService: SharedService
  ) {}

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
}
