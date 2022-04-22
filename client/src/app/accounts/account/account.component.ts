import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IAccount } from 'src/app/interfaces/IAccount';
import { AccountInformationComponent } from '../account-information/account-information.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  @Input() account!: IAccount;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(AccountInformationComponent, {
      width: '40%',
      data: {
        name: this.account.name,
        balance: this.account.balance,
        currency: this.account.currency,
        description: this.account.description,
      },
    });
  }
}
