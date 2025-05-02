import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
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

  @Input() id: number = 0;
  @Input() imageUrl: string = '';
  @Input() name: string = '';
  @Input() price: number = 0;
  @Input() discount: number = 0;
  @Input() class?: string = '';

  goToProduct() {
    this.router.navigate(['products', this.id]);
  }
}
