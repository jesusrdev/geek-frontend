import { Component, EventEmitter, Input, Output } from '@angular/core';

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

import { ImageProduct } from '../../../../../core/models/product';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'image-list',
  templateUrl: './image-list.component.html',
  styleUrl: './image-list.component.css',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
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
export class ImageListComponent {
  @Input()
  dataSource = new MatTableDataSource<ImageProduct, MatPaginator>();

  @Input()
  displayedColumns: string[] = [];

  @Input()
  input: any;

  @Output()
  public onEditImage = new EventEmitter<ImageProduct>();

  editImage(category: ImageProduct) {
    this.onEditImage.emit(category);
  }

  @Output()
  public onRemoveImage = new EventEmitter<ImageProduct>();

  removeImage(category: ImageProduct) {
    this.onRemoveImage.emit(category);
  }
}
