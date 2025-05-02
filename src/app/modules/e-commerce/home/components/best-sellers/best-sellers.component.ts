import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../../../../../core/models/product';
import { Brand } from '../../../../../core/models/brand';
import { NgFor, NgClass, NgIf } from '@angular/common';
import { ProductCardComponent } from '../../../../../shared/components/product-card/product-card.component';
import { ButtonComponent } from '../../../../../shared/components/button/button.component';

@Component({
  selector: 'home-best-sellers',
  templateUrl: './best-sellers.component.html',
  styleUrl: './best-sellers.component.css',
  imports: [NgFor, NgClass, ProductCardComponent, NgIf, ButtonComponent]
})
export class BestSellersComponent implements OnInit, AfterViewInit {
  @Input() products: Product[] = [];
  @Input() brands: Brand[] = [];

  productsFiltered: Product[] = [];

  @Input()
  brandActive: number = 1;

  filterProductsByBrandId(brandId: number) {
    this.brandActive = brandId;
    this.productsFiltered = this.products.filter(product => product.brandId === brandId).slice(0, 11);
  }

  constructor(private router: Router) {
    this.filterProductsByBrandId(this.brandActive);
  }

  ngOnInit(): void {
    this.filterProductsByBrandId(this.brandActive);
  }

  ngAfterViewInit(): void {
    this.filterProductsByBrandId(this.brandActive);
  }
}
