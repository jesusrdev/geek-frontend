import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { Product } from '../../../../../core/models/product';

@Component({
  selector: 'product-description',
  templateUrl: './description.component.html',
  styleUrl: './description.component.css'
})
export class DescriptionComponent implements OnInit {
  @Input() product: Product = {} as Product;
  @Input() productDescription: SafeHtml = '';

  constructor() {}

  ngOnInit(): void {}
}
