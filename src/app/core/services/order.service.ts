import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { environment } from '../../../environments/environment';
import { Observable, switchMap } from 'rxjs';

import { ApiResponse } from '../../shared/interfaces/api-response';
import { Order } from '../models/order';
import { loadStripe, Stripe, StripeCheckoutSession } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);

  private stripe: Stripe | null = null;

  baseUrl: string = environment.apiUrl + 'Order/';

  constructor() {
    this.initStripe();
  }

  private async initStripe() {
    this.stripe = await loadStripe(environment.stripe.publishableKey);
  }

  list(): Observable<ApiResponse<Order[]>> {
    return this.http.get<ApiResponse<Order[]>>(`${this.baseUrl}`);
  }

  create(shippingAddressId: number): Observable<void> {
    return this.http
      .post<ApiResponse<Order>>(`${this.baseUrl}`, {
        id: 0,
        status: 1,
        shippingMethod: 'Envío a domicilio', // Por defecto
        shippingDate: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString(),
        shippingAddressId
      })
      .pipe(
        switchMap(async response => {
          const stripe = await this.stripe;
          if (!stripe) {
            throw new Error('Stripe failed to initialize');
          }

          if (!response.result.sessionId) {
            throw new Error('No session id found');
          }

          const { error } = await stripe.redirectToCheckout({
            sessionId: response.result.sessionId // Redirect to Stripe checkout using sessionId from server
          });

          if (error) {
            throw new Error(error.message);
          }
        })
      );
  }

  async redirectToCheckout(sessionId?: string): Promise<void> {
    const stripe = await this.stripe;
    if (!stripe) {
      throw new Error('Stripe failed to initialize');
    }

    if (!sessionId) {
      throw new Error('No session id found');
    }

    const { error } = await stripe.redirectToCheckout({
      sessionId: sessionId
    });

    if (error) {
      throw new Error(error.message);
    }
  }

  success(orderId: number) {
    return this.http.post<ApiResponse<void>>(`${this.baseUrl}success/${orderId}`, null);
  }

  delete(orderId: number) {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}${orderId}`);
  }
}
