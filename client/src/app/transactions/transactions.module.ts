import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { TransactionComponent } from './transaction/transaction.component';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';

@NgModule({
  declarations: [TransactionComponent, TransactionsListComponent],
  imports: [CommonModule, SharedModule],
  exports: [TransactionsListComponent],
})
export class TransactionsModule {}
