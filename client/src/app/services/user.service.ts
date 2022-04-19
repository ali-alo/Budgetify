import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { ITransaction } from '../interfaces/ITransaction';
import { IUser } from '../interfaces/IUser';
import { IAccount } from '../interfaces/IAccount';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(): Observable<IUser> {
    return this.http.get<IUser>(
      `http://localhost:3000/user/${localStorage.getItem('userId')}`
    );
  }

  getAccounts(): Observable<IAccount[]> {
    return this.http.get<IAccount[]>(
      `http://localhost:3000/user/${localStorage.getItem('userId')}/accounts`
    );
  }

  // to update list of transactions based on the selected account
  private subject = new Subject<string | null>(); // a user may not have accounts
  setAccount() {
    this.subject.next(localStorage.getItem('accountId'));
  }

  setTransactions(): Observable<string | null> {
    return this.subject.asObservable();
  }

  getIncomes(): Observable<ITransaction[]> {
    return this.http.get<ITransaction[]>(
      `http://localhost:3000/user/${localStorage.getItem(
        'userId'
      )}/account/${localStorage.getItem('accountId')}/incomes`
    );
  }

  getExpenses(): Observable<ITransaction[]> {
    return this.http.get<ITransaction[]>(
      `http://localhost:3000/user/${localStorage.getItem(
        'userId'
      )}/account/${localStorage.getItem('accountId')}/expenses`
    );
  }
}
