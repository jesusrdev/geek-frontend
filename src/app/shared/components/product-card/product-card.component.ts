import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../core/services/shared.service';

@Component({
    selector: 'product-card',
    templateUrl: './product-card.component.html',
    styleUrl: './product-card.component.css',
    standalone: false
})
export class ProductCardComponent {
  @Input() id: number = 0;
  @Input() imageUrl: string = '';
  @Input() name: string = '';
  @Input() price: number = 0;
  @Input() discount: number = 0;
  @Input() class?: string = '';

  constructor(private router: Router) {}

  goToProduct() {
    this.router.navigate(['products', this.id]);
  }
}
