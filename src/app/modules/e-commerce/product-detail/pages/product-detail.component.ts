import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../../../../core/models/product';

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

  productId: number = 0;
  product?: Product;
  productDescription: SafeHtml = '';
  products: Product[] = [];

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = parseInt(params.get('id') || '0');
      this.getProduct();
      this.getProductsSuggested();
    });
  }

  getProduct() {
    this._productService.get(this.productId).subscribe({
      next: data => {
        if (data.isSuccessful) {
          this.product = data.result;
          this.productDescription = this.sanitizer.bypassSecurityTrustHtml(this.product.largeDescription);
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
    this._productService.listActive().subscribe({
      next: data => {
        if (data.isSuccessful) {
          this.products = data.result.filter(
            product => product.brandId === this.product?.brandId && product.id !== this.product?.id
          );
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
