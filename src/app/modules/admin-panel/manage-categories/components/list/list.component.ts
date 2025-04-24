import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from '../../../../../core/models/category';
import { MatPaginator } from '@angular/material/paginator';

@Component({
    selector: 'category-list',
    templateUrl: './list.component.html',
    styleUrl: './list.component.css',
    standalone: false
})
export class CategoryListComponent {
  @Input()
  dataSource = new MatTableDataSource<Category, MatPaginator>();

  @Input()
  displayedColumns: string[] = [];

  @Input()
  input: any;

  @Output()
  public onEditCategory = new EventEmitter<Category>();

  editCategory(category: Category) {
    this.onEditCategory.emit(category);
  }

  @Output()
  public onChangeStatus = new EventEmitter<Category>();

  changeStatus(category: Category) {
    this.onChangeStatus.emit(category);
  }
}
