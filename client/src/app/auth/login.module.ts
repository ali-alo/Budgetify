import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginFormComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  exports: [LoginFormComponent],
})
export class LoginModule {}
