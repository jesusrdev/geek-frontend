import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../../core/services/order.service';
import { SharedService } from '../../../../core/services/shared.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'app-checkout-cancel',
  templateUrl: './checkout-cancel.component.html',
  imports: [ButtonComponent, MatProgressBar],
  styleUrl: './checkout-cancel.component.css'
})
export default class CheckoutCancelComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private _orderService = inject(OrderService);
  private sharedService = inject(SharedService);

  readonly isLoading = signal(true);
  readonly error = signal<string | null>(null);
  readonly orderId = signal<number | null>(null);

  constructor() {
    this.route.queryParamMap.subscribe(params => {
      console.log(params);

      const orderId = params.get('orderId');

      if (orderId) {
        this.orderId.set(+orderId);
      } else {
        this.error.set('No se encontró la orden. Por favor, contacte con el administrador.');
        this.isLoading.set(false);
      }
    });

    effect(() => {
      if (this.orderId()) {
        this.cancelOrder();
      }
    });
  }

  cancelOrder() {
    this._orderService.delete(this.orderId()!).subscribe({
      next: response => {
        if (!response.isSuccessful) {
          this.sharedService.showAlert('Error al cancelar la orden', 'Error!');
          this.error.set(response.message || response.result || 'Error al cancelar la orden');
        }
        this.isLoading.set(false);
      },
      error: error => {
        this.isLoading.set(false);
        this.error.set(error.error.message);
      }
    });
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}
