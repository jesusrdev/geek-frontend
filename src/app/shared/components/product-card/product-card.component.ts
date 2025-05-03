import { Component, computed, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardImage } from '@angular/material/card';
import { DecimalPipe, NgClass, PercentPipe } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Product } from '../../../core/models/product';

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

  readonly product = input.required<Product>();
  readonly class = input<string>('');

  readonly imageUrl = computed<string>(() => {
    if (this.product().images.length > 0) {
      const image = this.product().images[0];
      if (image.urlImage) {
        return image.urlImage;
      }
    }
    return '';
  });

  goToProduct() {
    this.router.navigate(['products', this.product().id]);
  }
}
