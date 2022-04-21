import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { AccountCreateComponent } from './account-create/account-create.component';

export interface AccountCreationData {
  name: string;
  currency: string;
  description: string;
}

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent {
  name!: string;
  currency!: string;
  description!: string;

  constructor(public dialog: MatDialog, private userService: UserService) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AccountCreateComponent, {
      width: '40%',
      data: {
        name: this.name,
        currency: this.currency,
        description: this.description,
      },
    });

    dialogRef.afterClosed().subscribe((accountForm) => {
      console.log('The dialog was closed');
      const { name, currency, description } = accountForm;
      if (accountForm) {
        this.userService
          .createAccount(name, currency, description)
          .subscribe((account) => {
            console.log(account);
          });
      }
    });
  }
}
