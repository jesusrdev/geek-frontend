import { Component, effect, inject, signal } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../../core/services/order.service';
import { SharedService } from '../../../../core/services/shared.service';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrl: './checkout-success.component.css',
  imports: [ButtonComponent, MatProgressBar]
})
export default class CheckoutSuccessComponent {
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
        this.success();
      }
    });
  }

  success() {
    this._orderService.success(this.orderId()!).subscribe({
      next: response => {
        if (!response.isSuccessful) {
          this.sharedService.showAlert('Error al pagar la orden', 'Error!');
          this.error.set(response.message || response.result || 'Error al pagar la orden');
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
