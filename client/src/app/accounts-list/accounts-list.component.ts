import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

interface IAccount {
  name: string;
  balance: number;
  _id: string;
  isActive: boolean;
}

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss'],
})
export class AccountsListComponent implements OnInit {
  accounts: IAccount[] = [];

  constructor(private userData: UserService) {}

  viewTransactions(accountId: string): void {
    // reset active account
    this.accounts.forEach((account) => (account.isActive = false));

    const newActiveAccount = this.accounts.find(
      (account) => account._id === accountId
    );
    newActiveAccount!.isActive = true;
  }

  ngOnInit(): void {
    this.userData.getAccounts().subscribe({
      next: (data) => {
        console.log(data);
        data.forEach((account) => {
          this.accounts.push(account);
        });
        // set first account to be active (default)
        this.accounts[0].isActive = true;
      },
    });
  }
}
