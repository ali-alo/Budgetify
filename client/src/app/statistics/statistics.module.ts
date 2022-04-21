import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsComponent } from './statistics.component';

import { AccountsModule } from '../accounts/accounts.module';
import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from '../layout/layout.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { TableComponent } from './table/table.component';

@NgModule({
  declarations: [StatisticsComponent, DatepickerComponent, TableComponent],
  imports: [
    CommonModule,
    SharedModule,
    LayoutModule,
    AccountsModule,
    ReactiveFormsModule,
  ],
})
export class StatisticsModule {}
