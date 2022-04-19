import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface IUserToken {
  token: string;
  expiresIn: string;
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<IUserToken> {
    return this.http
      .post<IUserToken>('http://localhost:3000/sign-in', { email, password })
      .pipe(
        tap((res) => {
          this.setSession(res);
        })
      );
  }

  logout(): void {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    const expiresIn = localStorage.getItem('expiresIn');
    if (expiresIn) {
      return Date.now() < Number(expiresIn);
    }
    return false;
  }

  private setSession(res: IUserToken): void {
    const expiresIn = Date.now() + Number(res.expiresIn);
    localStorage.setItem('idToken', res.token);
    localStorage.setItem('expiresIn', String(expiresIn));
    localStorage.setItem('userId', res.id);
  }
}
