import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { Subcategory } from '../../../../core/models/subcategory';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { SharedService } from '../../../../core/services/shared.service';
import { SubcategoryService } from '../../../../core/services/subcategory.service';

import { SubcategoryModalComponent } from '../components/subcategory-modal/subcategory-modal.component';

import Swal from 'sweetalert2';

@Component({
    selector: 'app-subcategories',
    templateUrl: './subcategories.component.html',
    styleUrl: './subcategories.component.css',
    standalone: false
})
export class SubcategoriesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nameSubcategory', 'nameCategory', 'status', 'actions'];

  initialData: Subcategory[] = [];

  dataSource = new MatTableDataSource(this.initialData);

  @ViewChild(MatPaginator) tablePaginator!: MatPaginator;

  constructor(
    private _subcategoryService: SubcategoryService,
    private _sharedService: SharedService,
    private dialog: MatDialog
  ) {}

  getSubcategories() {
    this._subcategoryService.list().subscribe({
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

  newSubcategory() {
    this.dialog
      .open(SubcategoryModalComponent, { width: '400px' })
      .afterClosed()
      .subscribe(result => {
        if (result === true) this.getSubcategories();
      });
  }

  editSubcategory(subcategory: Subcategory) {
    this.dialog
      .open(SubcategoryModalComponent, {
        width: '400px',
        data: subcategory
      })
      .afterClosed()
      .subscribe(result => {
        if (result === true) this.getSubcategories();
      });
  }

  changeStatus(subcategory: Subcategory) {
    const text = subcategory.status != 1 ? 'activar' : 'desactivar';
    Swal.fire({
      title: `¿Quieres ${text} esta subcategoría?`,
      text: subcategory.nameSubcategory,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: `Si, ${text}`,
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No'
    }).then(result => {
      if (result.isConfirmed) {
        this._subcategoryService.changeStatus(subcategory.id).subscribe({
          next: data => {
            if (data.isSuccessful) {
              this._sharedService.showAlert(`Se logró ${text} la subcategoría con éxito`, 'Completado');
              this.getSubcategories();
            } else {
              this._sharedService.showAlert(`No se pudo ${text} la subcategoría`, 'Error!');
            }
          },
          error: e => {
            this._sharedService.showAlert(e.error.message, 'Error!');
          }
        });
      }
      this.getSubcategories();
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
    this.getSubcategories();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.tablePaginator;
  }
}
