import { Component, EventEmitter, Input, Output } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { Subcategory } from '../../../../../core/models/subcategory';

@Component({
  selector: 'subcategory-list',
  templateUrl: './subcategory-list.component.html',
  styleUrl: './subcategory-list.component.css'
})
export class SubcategoryListComponent {
  @Input()
  dataSource = new MatTableDataSource<Subcategory, MatPaginator>();

  @Input()
  displayedColumns: string[] = [];

  @Input()
  input: any;

  @Output()
  public onEditSubcategory = new EventEmitter<Subcategory>();

  editSubcategory(subcategory: Subcategory) {
    this.onEditSubcategory.emit(subcategory);
  }

  @Output()
  public onChangeStatus = new EventEmitter<Subcategory>();

  changeStatus(subcategory: Subcategory) {
    this.onChangeStatus.emit(subcategory);
  }
}
