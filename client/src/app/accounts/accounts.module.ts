import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from '../layout/layout.module';
import { TransactionsModule } from '../transactions/transactions.module';

import { AccountsComponent } from './accounts.component';
import { AccountComponent } from './account/account.component';
import { AccountsListComponent } from './accounts-list/accounts-list.component';

@NgModule({
  declarations: [AccountsComponent, AccountComponent, AccountsListComponent],
  imports: [CommonModule, SharedModule, LayoutModule, TransactionsModule],
})
export class AccountsModule {}
