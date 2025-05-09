import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductDetail, ProductList } from '../../../../core/models/product';

import { ProductService } from '../../../../core/services/product.service';
import { SharedService } from '../../../../core/services/shared.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { DescriptionComponent } from '../components/description/description.component';
import { ProductsSuggestedComponent } from '../components/products-suggested/products-suggested.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
  imports: [DescriptionComponent, ProductsSuggestedComponent]
})
export default class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private _productService = inject(ProductService);
  private _sharedService = inject(SharedService);
  private sanitizer = inject(DomSanitizer);

  productId = signal<number>(0);
  product = signal<ProductDetail>({} as ProductDetail);
  productDescription = signal<SafeHtml>('');
  products = signal<ProductList[]>([]);

  constructor() {
    effect(() => {
      this.route.paramMap.subscribe(params => {
        this.productId.set(parseInt(params.get('id') || '0'));
      });
      if (this.productId() > 0) {
        this.getProduct();
        this.getProductsSuggested();
      }

      // hacer scroll al inicio de la página
      window.scrollTo(0, 0);
    });
  }

  ngOnInit(): void {}

  getProduct() {
    this._productService.get(this.productId()).subscribe({
      next: data => {
        if (data.isSuccessful) {
          this.product.set(data.result);
          this.productDescription.set(this.sanitizer.bypassSecurityTrustHtml(this.product().largeDescription));
        } else {
          this._sharedService.showAlert('No se encontraró el producto', 'Advertencia');
        }
      },
      error: e => {
        this._sharedService.showAlert(e.error.message, 'Error!');
      }
    });
  }

  getProductsSuggested() {
    this._productService.listPopular().subscribe({
      next: data => {
        if (data.isSuccessful) {
          const products = data.result.filter(
            product => product.brandId === this.product().brandId && product.id !== this.product().id
          );

          if (products.length === 0) {
            this.products.set(data.result.splice(0, 6));
          } else {
            this.products.set(products.splice(0, 6));
          }
        } else {
          this._sharedService.showAlert('No se encontraron productos', 'Advertencia');
        }
      },
      error: e => {
        this._sharedService.showAlert(e.error.message, 'Error!');
      }
    });
  }
}
