import { AfterViewInit, Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../../../../../core/models/product';
import { Brand } from '../../../../../core/models/brand';
import { NgClass } from '@angular/common';
import { ProductCardComponent } from '../../../../../shared/components/product-card/product-card.component';
import { ButtonComponent } from '../../../../../shared/components/button/button.component';

@Component({
  selector: 'home-best-sellers',
  templateUrl: './best-sellers.component.html',
  styleUrl: './best-sellers.component.css',
  imports: [NgClass, ProductCardComponent, ButtonComponent]
})
export class BestSellersComponent implements OnInit, AfterViewInit {
  private router = inject(Router);

  @Input() products: Product[] = [];
  @Input() brands: Brand[] = [];

  productsFiltered: Product[] = [];

  @Input()
  brandActive: number = 1;

  filterProductsByBrandId(brandId: number) {
    this.brandActive = brandId;
    this.productsFiltered = this.products.filter(product => product.brandId === brandId).slice(0, 11);
  }

  constructor() {
    this.filterProductsByBrandId(this.brandActive);
  }

  ngOnInit(): void {
    this.filterProductsByBrandId(this.brandActive);
  }

  ngAfterViewInit(): void {
    this.filterProductsByBrandId(this.brandActive);
  }
}
