import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../../../../../core/models/product';
import { DomSanitizer } from '@angular/platform-browser';

import { ButtonComponent } from '../../../../../shared/components/button/button.component';

@Component({
  selector: 'home-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  imports: [ButtonComponent]
})
export class HeroComponent {
  private router = inject(Router);
  sanitizer = inject(DomSanitizer);

  @Input()
  public products: Product[] = [];

  goToProduct(productId: number) {
    this.router.navigate(['products', productId]);
  }
}
