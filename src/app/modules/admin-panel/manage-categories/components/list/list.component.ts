import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Category} from '../../../../../core/models/category';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'category-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  // displayedColumns: string[] = [
  //   'nameCategory',
  //   'estatus',
  //   'actions',
  // ];
  //
  // initialData: Category[] = [];

  @Input()
  dataSource:  MatTableDataSource<Category, MatPaginator> = new MatTableDataSource();

  @Input()
  displayedColumns: string[] = [];

  @Input()
  input: any;

  @Output()
  public onEditCategory: EventEmitter<Category> = new EventEmitter();

  editCategory(category: Category) {
    this.onEditCategory.emit(category);
  }

  @Output()
  public onChangeStatus: EventEmitter<Category> = new EventEmitter();

  changeStatus(category: Category) {
    this.onChangeStatus.emit(category);
  }


}
