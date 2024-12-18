import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialModule } from './material/material.module';
import { ButtonComponent } from './components/button/button.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  declarations: [ButtonComponent, ProductCardComponent],
  imports: [CommonModule, MaterialModule],
  exports: [FormsModule, HttpClientModule, ReactiveFormsModule, ButtonComponent, ProductCardComponent, EditorModule]
})
export class SharedModule {}
