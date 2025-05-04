import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardImage } from '@angular/material/card';
import { DecimalPipe, NgClass, PercentPipe } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ProductList } from '../../../core/models/product';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
  imports: [
    MatCard,
    NgClass,
    MatCardHeader,
    MatCardImage,
    MatCardContent,
    MatCardActions,
    MatIconButton,
    MatIcon,
    DecimalPipe,
    PercentPipe
  ]
})
export class ProductCardComponent {
  private router = inject(Router);

  readonly product = input.required<ProductList>();
  readonly class = input<string>('');

  goToProduct() {
    this.router.navigate(['products', this.product().id]);
  }
}
