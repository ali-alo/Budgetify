import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from '../layout/layout.module';
import { TransactionsModule } from '../transactions/transactions.module';
import { FormsModule } from '@angular/forms';

import { AccountsComponent } from './accounts.component';
import { AccountComponent } from './account/account.component';
import { AccountsListComponent } from './accounts-list/accounts-list.component';
import { AccountCreateComponent } from './account-create/account-create.component';
import { AccountInformationComponent } from './account-information/account-information.component';

@NgModule({
  declarations: [
    AccountsComponent,
    AccountComponent,
    AccountsListComponent,
    AccountCreateComponent,
    AccountInformationComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    LayoutModule,
    TransactionsModule,
    FormsModule,
  ],
  exports: [AccountsListComponent],
})
export class AccountsModule {}
