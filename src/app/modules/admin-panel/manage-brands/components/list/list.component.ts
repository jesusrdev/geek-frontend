import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Brand } from '../../../../../core/models/brand';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'brand-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class BrandListComponent {
  @Input()
  dataSource = new MatTableDataSource<Brand, MatPaginator>();

  @Input()
  displayedColumns: string[] = [];

  @Input()
  input: any;

  @Output()
  public onEditBrand = new EventEmitter<Brand>();

  editBrand(category: Brand) {
    this.onEditBrand.emit(category);
  }

  @Output()
  public onChangeStatus = new EventEmitter<Brand>();

  changeStatus(category: Brand) {
    this.onChangeStatus.emit(category);
  }
}
