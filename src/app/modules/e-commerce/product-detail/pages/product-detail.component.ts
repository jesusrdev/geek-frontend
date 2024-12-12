import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../../../../core/models/product';

import { ProductService } from '../../../../core/services/product.service';
import { SharedService } from '../../../../core/services/shared.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  productId: number = 0;
  product?: Product;

  constructor(
    private route: ActivatedRoute,
    private _productService: ProductService,
    private _sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = parseInt(params.get('id') || '0');
    });

    this._productService.get(this.productId).subscribe({
      next: data => {
        if (data.isSuccessful) {
          this.product = data.result;
        } else {
          this._sharedService.showAlert('No se encontraró el producto', 'Advertencia');
        }
      },
      error: e => {
        this._sharedService.showAlert(e.error.message, 'Error!');
      }
    });
  }
}
