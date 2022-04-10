import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [NavComponent],
  imports: [CommonModule, MatButtonModule, MatInputModule, MatFormFieldModule],
  exports: [MatButtonModule, MatInputModule, MatFormFieldModule, NavComponent],
})
export class SharedModule {}
