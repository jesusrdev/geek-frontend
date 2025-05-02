import { Component, input, output } from '@angular/core';
import {
  MatTableDataSource,
  MatTable,
  MatColumnDef,
  MatHeaderCellDef,
  MatHeaderCell,
  MatCellDef,
  MatCell,
  MatHeaderRowDef,
  MatHeaderRow,
  MatRowDef,
  MatRow,
  MatNoDataRow
} from '@angular/material/table';
import { Category } from '../../../../../core/models/category';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'category-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatSlideToggle,
    MatIconButton,
    MatIcon,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    MatNoDataRow,
    MatPaginator
  ]
})
export class CategoryListComponent {
  readonly dataSource = input(new MatTableDataSource<Category, MatPaginator>());

  readonly displayedColumns = input<string[]>([]);

  readonly input = input<any>();

  public readonly onEditCategory = output<Category>();

  editCategory(category: Category) {
    this.onEditCategory.emit(category);
  }

  public readonly onChangeStatus = output<Category>();

  changeStatus(category: Category) {
    this.onChangeStatus.emit(category);
  }
}
