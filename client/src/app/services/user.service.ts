import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs';

import { ITransaction } from '../interfaces/ITransaction';
import { IUser } from '../interfaces/IUser';
import { IAccount } from '../interfaces/IAccount';
import { ICategory } from '../interfaces/ICategory';
import { IExpenseStatistics } from '../interfaces/IExpenseStatistics';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(): Observable<IUser> {
    return this.http
      .get<IUser>(
        `http://localhost:3000/user/${localStorage.getItem('userId')}`
      )
      .pipe(take(1));
  }

  getAccounts(): Observable<IAccount[]> {
    return this.http
      .get<IAccount[]>(
        `http://localhost:3000/user/${localStorage.getItem('userId')}/accounts`
      )
      .pipe(take(1));
  }

  getIncomes(accountId: string): Observable<ITransaction[]> {
    return this.http
      .get<ITransaction[]>(
        `http://localhost:3000/user/${localStorage.getItem(
          'userId'
        )}/account/${accountId}/incomes`
      )
      .pipe(take(1));
  }

  getExpenses(accountId: string): Observable<ITransaction[]> {
    console.log(accountId);
    return this.http
      .get<ITransaction[]>(
        `http://localhost:3000/user/${localStorage.getItem(
          'userId'
        )}/account/${accountId}/expenses`
      )
      .pipe(take(1));
  }

  getCategories(): Observable<ICategory[]> {
    return this.http
      .get<ICategory[]>(
        `http://localhost:3000/user/${localStorage.getItem(
          'userId'
        )}/categories`
      )
      .pipe(take(1));
  }

  getExpenseStatistics(accountId: string): Observable<IExpenseStatistics[]> {
    console.log(accountId);
    return this.http.get<IExpenseStatistics[]>(
      `http://localhost:3000/user/${localStorage.getItem(
        'userId'
      )}/account/${accountId}/expense/statistics`
    );
  }

  createAccount(
    name: string,
    currency: string,
    description: string
  ): Observable<IAccount> {
    return this.http.post<IAccount>(
      `http://localhost:3000/user/${localStorage.getItem(
        'userId'
      )}/account-create`,
      { name, currency, description }
    );
  }
}
