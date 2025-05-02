import { Component, input } from '@angular/core';

import { Product } from '../../../../../core/models/product';

import { ProductCardComponent } from '../../../../../shared/components/product-card/product-card.component';

@Component({
  selector: 'products-suggested',
  templateUrl: './products-suggested.component.html',
  styleUrl: './products-suggested.component.css',
  imports: [ProductCardComponent]
})
export class ProductsSuggestedComponent {
  readonly products = input<Product[]>([]);
}
