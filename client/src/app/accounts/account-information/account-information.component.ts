import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAccount } from 'src/app/interfaces/IAccount';

@Component({
  selector: 'app-account-information',
  templateUrl: './account-information.component.html',
  styleUrls: ['./account-information.component.scss'],
})
export class AccountInformationComponent {
  constructor(
    public dialogRef: MatDialogRef<AccountInformationComponent>,
    @Inject(MAT_DIALOG_DATA) public accountInfo: IAccount
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
