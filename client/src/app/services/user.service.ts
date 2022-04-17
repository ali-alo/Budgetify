import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface IUserObject {
  name: string;
  surname: string;
  email: string;
  country: string;
  password: string;
  dob: Date;
  accountsIds: [];
  categoriesIds: object;
  isAdmin: boolean;
}

interface IAccount {
  name: string;
  balance: number;
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
}
