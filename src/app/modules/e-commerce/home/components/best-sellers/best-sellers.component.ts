import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';

import { Product } from '../../../../../core/models/product';
import { Brand } from '../../../../../core/models/brand';

import { ProductCardComponent } from '../../../../../shared/components/product-card/product-card.component';
import { ButtonComponent } from '../../../../../shared/components/button/button.component';

@Component({
  selector: 'home-best-sellers',
  templateUrl: './best-sellers.component.html',
  styleUrl: './best-sellers.component.css',
  imports: [NgClass, ProductCardComponent, ButtonComponent]
})
export class BestSellersComponent {
  private router = inject(Router);

  readonly products = input<Product[]>([]);
  readonly brands = input<Brand[]>([]);

  productsFiltered = computed(() => this.products().filter(product => product.brandId === this.brandActive()));

  brandActive = signal<number>(1);

  filterProductsByBrandId(brandId: number) {
    this.brandActive.set(brandId);
  }

  constructor() {
    effect(() => {
      const firstBrand = this.brands()[0];
      if (firstBrand) {
        this.brandActive.set(firstBrand.id);
      }
      // this.filterProductsByBrandId(this.brandActive());
    });
  }

  goToProducts() {
    this.router.navigate(['/products'], { queryParams: { brandsId: [this.brandActive()] } });
  }
}
