import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

interface IUserObject {
  name: string;
  surname: string;
  email: string;
  country: string;
  password: string;
  dob: Date;
  accountsIds: string[];
  categoriesIds: object;
  isAdmin: boolean;
}

interface IAccount {
  name: string;
  balance: number;
  _id: string;
  isActive: boolean;
}

interface ITransaction {
  title: string;
  amount: number;
  categoryIds: string[];
  accountId: string;
  paymentDate: Date;
  creationDate: Date;
  updateDate: Date;
  comment: string;
  isIncome: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(): Observable<IUserObject> {
    return this.http.get<IUserObject>(
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

  setTransactions(): Observable<any> {
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
