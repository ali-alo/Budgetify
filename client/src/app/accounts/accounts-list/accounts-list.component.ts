import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IAccount } from 'src/app/interfaces/IAccount';

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss'],
})
export class AccountsListComponent implements OnInit {
  accounts: IAccount[] = [];

  constructor(private userData: UserService) {}

  chooseAccount(accountId: string): void {
    // reset active account
    this.accounts.forEach((account) => (account.isActive = false));

    const newActiveAccount = this.accounts.find(
      (account) => account._id === accountId
    );
    newActiveAccount!.isActive = true;
    localStorage.setItem('accountId', accountId);
    this.userData.setAccount();
  }

  ngOnInit(): void {
    this.userData.getAccounts().subscribe({
      next: (data) => {
        console.log(data);
        data.forEach((account) => {
          this.accounts.push(account);
        });
        // set first account to be active (default)
        this.chooseAccount(this.accounts[0]._id);
      },
    });
  }
}
