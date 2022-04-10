import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post('http://localhost:3000/sign-in', { email, password })
      .pipe(tap((res) => this.setSession(res)));
  }

  isLoggedIn() {
    const expiresIn = localStorage.getItem('expiresIn');
    if (expiresIn) {
      return Date.now() < Number(expiresIn);
    }
    return false;
  }

  private setSession(res: any) {
    const expiresIn = Date.now() + Number(res.expiresIn);
    console.log(Number(res.expiresIn));
    localStorage.setItem('userToken', res.token);
    localStorage.setItem('expiresIn', String(expiresIn));
  }
}
