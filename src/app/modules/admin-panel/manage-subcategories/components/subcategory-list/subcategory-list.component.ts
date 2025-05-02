import { Component, EventEmitter, Output, input } from '@angular/core';

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
import { MatPaginator } from '@angular/material/paginator';

import { Subcategory } from '../../../../../core/models/subcategory';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'subcategory-list',
  templateUrl: './subcategory-list.component.html',
  styleUrl: './subcategory-list.component.css',
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
export class SubcategoryListComponent {
  readonly dataSource = input(new MatTableDataSource<Subcategory, MatPaginator>());

  readonly displayedColumns = input<string[]>([]);

  readonly input = input<any>();

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
