import { Component, EventEmitter, Input, Output } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { ImageProduct } from '../../../../../core/models/product';

@Component({
  selector: 'image-list',
  templateUrl: './image-list.component.html',
  styleUrl: './image-list.component.css'
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
