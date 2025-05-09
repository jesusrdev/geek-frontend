import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { Product } from '../../../../core/models/product';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ProductService } from '../../../../core/services/product.service';
import { SharedService } from '../../../../core/services/shared.service';

import { ProductModalComponent } from '../components/product-modal/product-modal.component';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'nameProduct',
    'image',
    'description',
    'price',
    'stock',
    'discount',
    'categoryId',
    'brandId',
    'subcategoryId',
    'actions'
  ];

  initialData: Product[] = [];

  dataSource = new MatTableDataSource(this.initialData);

  @ViewChild(MatPaginator) tablePaginator!: MatPaginator;

  constructor(
    private _productService: ProductService,
    private _sharedService: SharedService,
    private dialog: MatDialog
  ) {}

  getCategories() {
    this._productService.list().subscribe({
      next: data => {
        if (data.isSuccessful) {
          this.dataSource = new MatTableDataSource(data.result);
          this.dataSource.paginator = this.tablePaginator;
        } else {
          this._sharedService.showAlert('No se encontraron datos', 'Advertencia');
        }
      },
      error: e => {
        this._sharedService.showAlert(e.error.message, 'Error!');
      }
    });
  }

  newProduct() {
    this.dialog
      .open(ProductModalComponent, { width: '600px' })
      .afterClosed()
      .subscribe(result => {
        if (result === true) this.getCategories();
      });
  }

  editProduct(product: Product) {
    this.dialog
      .open(ProductModalComponent, {
        width: '600px',
        data: product
      })
      .afterClosed()
      .subscribe(result => {
        if (result === true) this.getCategories();
      });
  }

  changeStatus(product: Product) {
    const text = product.status != 1 ? 'activar' : 'desactivar';
    Swal.fire({
      title: `¿Quieres ${text} este producto?`,
      text: product.nameProduct,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: `Si, ${text}`,
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No'
    }).then(result => {
      if (result.isConfirmed) {
        this._productService.changeStatus(product.id).subscribe({
          next: data => {
            if (data.isSuccessful) {
              this._sharedService.showAlert(`Se logró ${text} el producto con éxito`, 'Completado');
              this.getCategories();
            } else {
              this._sharedService.showAlert(`No se pudo ${text} el producto`, 'Error!');
            }
          },
          error: e => {
            this._sharedService.showAlert(e.error.message, 'Error!');
          }
        });
      }
      this.getCategories();
    });
  }

  applyFilterList(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.getCategories();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.tablePaginator;
  }
}
