import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { CategoryComponent } from './category/category.component';
import { LayoutModule } from '../layout/layout.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CategoriesComponent, CategoryComponent],
  imports: [CommonModule, LayoutModule, SharedModule],
})
export class CategoriesModule {}
