import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountCreationData } from '../accounts.component';

@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.scss'],
})
export class AccountCreateComponent {
  constructor(
    public dialogRef: MatDialogRef<AccountCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public accountForm: AccountCreationData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  currencies = ['USD', 'RUBLE', 'EURO'];
}
