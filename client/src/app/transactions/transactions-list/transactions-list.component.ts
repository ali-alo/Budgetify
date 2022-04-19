import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { ITransaction } from 'src/app/interfaces/ITransaction';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss'],
})
export class TransactionsListComponent {
  transactionSub!: Subscription;
  transactions: ITransaction[] = [];

  constructor(private userData: UserService) {
    this.transactionSub = userData.setTransactions().subscribe(() => {
      this.transactions = [];
      this.getTransactions();
    });
  }

  getTransactions(): void {
    // populate user's transactions
    this.getIncomes();
    this.getExpenses();
  }

  getIncomes(): void {
    this.userData.getIncomes().subscribe({
      next: (data) => {
        data.forEach((transaction) => {
          transaction.isIncome = true;
          this.transactions.push(transaction);
        });
      },
    });
  }

  getExpenses(): void {
    this.userData.getExpenses().subscribe({
      next: (data) => {
        data.forEach((transaction) => {
          transaction.isIncome = false;
          this.transactions.push(transaction);
        });
      },
    });
  }
}
