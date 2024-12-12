import { Component, Input } from '@angular/core';

import { Product } from '../../../../../core/models/product';

@Component({
  selector: 'product-description',
  templateUrl: './description.component.html',
  styleUrl: './description.component.css'
})
export class DescriptionComponent {
  @Input() product: Product = {} as Product;
}
