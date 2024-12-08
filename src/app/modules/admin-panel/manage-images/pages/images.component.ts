import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { ImageProduct } from '../../../../core/models/product';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ImageService } from '../../../../core/services/image.service';
import { SharedService } from '../../../../core/services/shared.service';

import { ImageModalComponent } from '../components/image-modal/image-modal.component';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrl: './images.component.css'
})
export class ImagesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nameProduct', 'imageUrl', 'actions'];

  initialData: ImageProduct[] = [];

  dataSource = new MatTableDataSource(this.initialData);

  @ViewChild(MatPaginator) tablePaginator!: MatPaginator;

  constructor(
    private _brandService: ImageService,
    private _sharedService: SharedService,
    private dialog: MatDialog
  ) {}

  getCategories() {
    this._brandService.list().subscribe({
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

  newImage() {
    this.dialog
      .open(ImageModalComponent, { width: '400px' })
      .afterClosed()
      .subscribe(result => {
        if (result === true) this.getCategories();
      });
  }

  editImage(brand: ImageProduct) {
    this.dialog
      .open(ImageModalComponent, {
        width: '400px',
        data: brand
      })
      .afterClosed()
      .subscribe(result => {
        if (result === true) this.getCategories();
      });
  }

  removeImage(brand: ImageProduct) {
    Swal.fire({
      title: `¿Quieres eliminar esta imagen?`,
      // text: brand.nameImage,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: `Si, eliminar`,
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No'
    }).then(result => {
      if (result.isConfirmed) {
        this._brandService.delete(brand.id).subscribe({
          next: data => {
            if (data.isSuccessful) {
              this._sharedService.showAlert(`Se logró eliminar la imagen con éxito`, 'Completado');
              this.getCategories();
            } else {
              this._sharedService.showAlert(`No se pudo eliminar la imagen`, 'Error!');
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
