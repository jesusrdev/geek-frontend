import { Component, EventEmitter, Output, input } from '@angular/core';

import { Brand } from '../../../../../core/models/brand';

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
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'brand-list',
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
export class BrandListComponent {
  readonly dataSource = input(new MatTableDataSource<Brand, MatPaginator>());

  readonly displayedColumns = input<string[]>([]);

  readonly input = input<any>();

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
