import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs';

import { ITransaction } from '../interfaces/ITransaction';
import { IUser } from '../interfaces/IUser';
import { IAccount } from '../interfaces/IAccount';
import { ICategory } from '../interfaces/ICategory';

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
    return this.http
      .get<ITransaction[]>(
        `http://localhost:3000/user/${localStorage.getItem(
          'userId'
        )}/account/${accountId}/expenses`
      )
      .pipe(take(1));
  }

  ////   This part is for the next HW   \\\\\

  getCategories(): Observable<ICategory[]> {
    return this.http
      .get<ICategory[]>(
        `http://localhost:3000/user/${localStorage.getItem(
          'userId'
        )}/categories`
      )
      .pipe(take(1));
  }
}
