import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ITransaction } from 'src/app/interfaces/ITransaction';
import { HelperService } from 'src/app/services/helper.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss'],
})
export class TransactionsListComponent implements OnInit, OnDestroy {
  transactions: ITransaction[] = [];
  accountId = '';
  subscription = new Subscription();

  constructor(
    private userData: UserService,
    private userHelper: HelperService
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.userHelper
      .getAccountId()
      .subscribe((accountId) => {
        // a user may not have accounts
        this.transactions = [];
        if (accountId) {
          this.accountId = accountId;
          this.getTransactions();
        }
      });
  }

  getTransactions(): void {
    // populate user's transactions
    this.getIncomes();
    this.getExpenses();
  }

  getIncomes(): void {
    this.userData.getIncomes(this.accountId).subscribe({
      next: (data) => {
        data.forEach((transaction) => {
          transaction.isIncome = true;
          this.transactions.push(transaction);
        });
      },
    });
  }

  getExpenses(): void {
    this.userData.getExpenses(this.accountId).subscribe({
      next: (data) => {
        console.log(data);
        data.forEach((transaction) => {
          transaction.isIncome = false;
          this.transactions.push(transaction);
        });
      },
    });
  }
}
