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
  accountsIds: object;
  categoriesIds: object;
  isAdmin: boolean;
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
}
