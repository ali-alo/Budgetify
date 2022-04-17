import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

interface IAccount {
  name: string;
  balance: number;
}

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss'],
})
export class AccountsListComponent implements OnInit {
  accounts: IAccount[] = [];

  constructor(private userData: UserService) {}

  ngOnInit(): void {
    this.userData.getAccounts().subscribe({
      next: (data) => {
        console.log(data);
        data.forEach((account) => {
          this.accounts.push(account);
        });
      },
    });
  }
}
