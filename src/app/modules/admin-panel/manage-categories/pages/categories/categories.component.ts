import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { Category } from '../../../../../core/models/category';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { CategoryService } from '../../../../../core/services/category.service';
import { SharedService } from '../../../../../core/services/shared.service';

import Swal from 'sweetalert2';

import { CategoryModalComponent } from '../../components/modal/modal.component';
import { MatCard, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/list';
import { MatFormField, MatLabel, MatInput } from '@angular/material/input';
import { CategoryListComponent } from '../../components/list/list.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
  imports: [
    MatCard,
    MatCardTitle,
    MatButton,
    MatIcon,
    MatDivider,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatInput,
    CategoryListComponent
  ]
})
export class CategoriesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nameCategory', 'status', 'actions'];

  initialData: Category[] = [];

  dataSource = new MatTableDataSource(this.initialData);

  @ViewChild(MatPaginator) tablePaginator!: MatPaginator;

  constructor(
    private _categoryService: CategoryService,
    private _sharedService: SharedService,
    private dialog: MatDialog
  ) {}

  getCategories() {
    this._categoryService.list().subscribe({
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

  newCategory() {
    this.dialog
      .open(CategoryModalComponent, { width: '400px' })
      .afterClosed()
      .subscribe(result => {
        if (result === true) this.getCategories();
      });
  }

  editCategory(category: Category) {
    this.dialog
      .open(CategoryModalComponent, {
        width: '400px',
        data: category
      })
      .afterClosed()
      .subscribe(result => {
        if (result === true) this.getCategories();
      });
  }

  changeStatus(category: Category) {
    const text = category.status != 1 ? 'activar' : 'desactivar';
    Swal.fire({
      title: `¿Quieres ${text} esta categoría?`,
      text: category.nameCategory,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: `Si, ${text}`,
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No'
    }).then(result => {
      if (result.isConfirmed) {
        this._categoryService.changeStatus(category.id).subscribe({
          next: data => {
            if (data.isSuccessful) {
              this._sharedService.showAlert(`Se logró ${text} la categoría con éxito`, 'Completado');
              this.getCategories();
            } else {
              this._sharedService.showAlert(`No se pudo ${text} la categoría`, 'Error!');
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
