import { Component, Input } from '@angular/core';

import { Product } from '../../../../../core/models/product';

@Component({
    selector: 'products-suggested',
    templateUrl: './products-suggested.component.html',
    styleUrl: './products-suggested.component.css',
    standalone: false
})
export class ProductsSuggestedComponent {
  @Input() products: Product[] = [];
}
