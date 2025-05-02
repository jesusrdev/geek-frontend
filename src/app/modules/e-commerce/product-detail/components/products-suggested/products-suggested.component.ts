import { Component, Input } from '@angular/core';

import { Product } from '../../../../../core/models/product';
import { NgFor } from '@angular/common';
import { ProductCardComponent } from '../../../../../shared/components/product-card/product-card.component';

@Component({
  selector: 'products-suggested',
  templateUrl: './products-suggested.component.html',
  styleUrl: './products-suggested.component.css',
  imports: [NgFor, ProductCardComponent]
})
export class ProductsSuggestedComponent {
  @Input() products: Product[] = [];
}
