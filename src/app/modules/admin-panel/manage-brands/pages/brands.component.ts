import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { Brand } from '../../../../core/models/brand';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { BrandService } from '../../../../core/services/brand.service';
import { SharedService } from '../../../../core/services/shared.service';

import { BrandModalComponent } from '../components/brand-modal/brand-modal.component';

import Swal from 'sweetalert2';

@Component({
    selector: 'app-brands',
    templateUrl: './brands.component.html',
    styleUrl: './brands.component.css',
    standalone: false
})
export class BrandsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nameBrand', 'imageUrl', 'status', 'actions'];

  initialData: Brand[] = [];

  dataSource = new MatTableDataSource(this.initialData);

  @ViewChild(MatPaginator) tablePaginator!: MatPaginator;

  constructor(
    private _brandService: BrandService,
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

  newBrand() {
    this.dialog
      .open(BrandModalComponent, { width: '400px' })
      .afterClosed()
      .subscribe(result => {
        if (result === true) this.getCategories();
      });
  }

  editBrand(brand: Brand) {
    this.dialog
      .open(BrandModalComponent, {
        width: '400px',
        data: brand
      })
      .afterClosed()
      .subscribe(result => {
        if (result === true) this.getCategories();
      });
  }

  changeStatus(brand: Brand) {
    const text = brand.status != 1 ? 'activar' : 'desactivar';
    Swal.fire({
      title: `¿Quieres ${text} esta marca?`,
      text: brand.nameBrand,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: `Si, ${text}`,
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No'
    }).then(result => {
      if (result.isConfirmed) {
        this._brandService.changeStatus(brand.id).subscribe({
          next: data => {
            if (data.isSuccessful) {
              this._sharedService.showAlert(`Se logró ${text} la marca con éxito`, 'Completado');
              this.getCategories();
            } else {
              this._sharedService.showAlert(`No se pudo ${text} la marca`, 'Error!');
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
