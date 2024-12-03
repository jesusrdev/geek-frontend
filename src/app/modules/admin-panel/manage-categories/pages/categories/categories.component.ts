import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';

import {Category} from '../../../../../core/models/category';

import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';

import {CategoryService} from '../../../../../core/services/category.service';
import {SharedService} from '../../../../../core/services/shared.service';

import Swal from 'sweetalert2';
import {ModalComponent} from '../../components/modal/modal.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'nameCategory',
    'estatus',
    'actions',
  ];

  initialData: Category[] = [];

  dataSource = new MatTableDataSource(this.initialData);

  @ViewChild(MatPaginator) tablePaginator!: MatPaginator;

  constructor(
    private _categoryService: CategoryService,
    private _sharedService: SharedService,
    private dialog: MatDialog
  ) {
  }

  getCategories() {
    this._categoryService.list().subscribe({
      next: (data) => {
        if (data.isSuccessful) {
          this.dataSource = new MatTableDataSource(data.result);
          this.dataSource.paginator = this.tablePaginator;
        } else {
          this._sharedService.showAlert('Not data found', 'Warning');
        }
      },
      error: (e) => {
        this._sharedService.showAlert(e.error.message, 'Error!');
      },
    });
  }

  newCategory() {
   this.dialog
     .open(ModalComponent, {width: '400px'})
     .afterClosed()
     .subscribe((result) => {
       if (result === true) this.getCategories();
     });
  }

  editCategory(category: Category) {
   this.dialog
     .open(ModalComponent, {
       width: '400px',
       data: category,
     })
     .afterClosed()
     .subscribe((result) => {
       if (result === true) this.getCategories();
     });
  }

  changeStatus(category: Category) {
    const text = category.estatus != 1 ? "activar" : "desactivar";
    Swal.fire({
      title: `¿Quieres ${text} esta categoría?`,
      text: category.nameCategory,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: `Si, ${text}`,
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this._categoryService.changeStatus(category.id).subscribe({
          next: (data) => {
            if (data.isSuccessful) {
              this._sharedService.showAlert(
                'La categoría ha sido eliminada',
                'Completado'
              );
              this.getCategories();
            } else {
              this._sharedService.showAlert(
                'No se pudo eliminar la categoría',
                'Error!'
              );
            }
          },
          error: (e) => {
            this._sharedService.showAlert(e.error.message, 'Error!');
          },
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
