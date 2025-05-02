import { AfterViewInit, Component, ViewChild, input, output } from '@angular/core';

import { Product } from '../../../../../core/models/product';

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
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
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
export class ProductListComponent {
  readonly dataSource = input(new MatTableDataSource<Product>());

  readonly displayedColumns = input<string[]>([]);

  readonly input = input<any>();

  @ViewChild(MatPaginator)
  tablePaginator!: MatPaginator;

  public readonly onEditProduct = output<Product>();

  editProduct(category: Product) {
    this.onEditProduct.emit(category);
  }

  public readonly onChangeStatus = output<Product>();

  changeStatus(category: Product) {
    this.onChangeStatus.emit(category);
  }
}
