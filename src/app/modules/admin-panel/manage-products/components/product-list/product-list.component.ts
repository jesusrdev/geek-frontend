import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Product } from '../../../../../core/models/product';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  @Input()
  dataSource = new MatTableDataSource<Product, MatPaginator>();

  @Input()
  displayedColumns: string[] = [];

  @Input()
  input: any;

  @Output()
  public onEditProduct = new EventEmitter<Product>();

  editProduct(category: Product) {
    this.onEditProduct.emit(category);
  }

  @Output()
  public onChangeStatus = new EventEmitter<Product>();

  changeStatus(category: Product) {
    this.onChangeStatus.emit(category);
  }
}
