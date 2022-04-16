import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, SharedModule, AppRoutingModule],
  exports: [HeaderComponent],
})
export class LayoutModule {}
