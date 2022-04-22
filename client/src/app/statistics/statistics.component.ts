import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HelperService } from '../services/helper.service';
import { UserService } from '../services/user.service';
import { IExpenseStatistics } from '../interfaces/IExpenseStatistics';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit, OnDestroy {
  expenseStatistics!: IExpenseStatistics[];
  accountId = '';
  subscription = new Subscription();

  tableByMonthRows = [
    'Month',
    'Incomes',
    'Expenses',
    'Savings',
    '% of savings',
  ];
  tableByCategoryRows = ['Category', 'Amount', '% in total'];
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor(
    private userHelper: HelperService,
    private userData: UserService
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.userHelper
      .getAccountId()
      .subscribe((accountId) => {
        console.log(accountId);
        this.expenseStatistics = [];
        if (accountId) {
          this.accountId = accountId;
          this.getExpenseStat();
        }
      });
  }

  getExpenseStat(): void {
    this.userData
      .getExpenseStatistics(this.accountId)
      .subscribe((data) => console.log(data));
  }
}
