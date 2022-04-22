import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IAccount } from 'src/app/interfaces/IAccount';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss'],
})
export class AccountsListComponent implements OnInit {
  accounts: IAccount[] = [];
  constructor(
    private userData: UserService,
    private userHelper: HelperService
  ) {}

  chooseAccount(accountId: string): void {
    // reset active account
    this.accounts.forEach((account) => (account.isActive = false));

    const newActiveAccount = this.accounts.find(
      (account) => account._id === accountId
    );
    newActiveAccount!.isActive = true;
    this.userHelper.setAccountId(accountId);
  }

  ngOnInit(): void {
    this.userData.getAccounts().subscribe((data) => {
      this.accounts = data;
      // set first account to be active (default)
      this.chooseAccount(this.accounts[0]._id);
    });
  }
}
