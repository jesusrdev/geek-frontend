import { Component, EventEmitter, Input, Output, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../core/services/shared.service';
import { MatCard, MatCardHeader, MatCardImage, MatCardContent, MatCardActions } from '@angular/material/card';
import { NgClass, DecimalPipe, PercentPipe } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

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

  readonly id = input<number>(0);
  readonly imageUrl = input<string>('');
  readonly name = input<string>('');
  readonly price = input<number>(0);
  discount = input<number>(0);
  readonly class = input<string | undefined>('');

  goToProduct() {
    this.router.navigate(['products', this.id()]);
  }
}
