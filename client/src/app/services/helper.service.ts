import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor() {}

  private accountSource = new Subject<string>();
  getAccountId(): Observable<string> {
    console.log('getting account');
    return this.accountSource.asObservable();
  }

  setAccountId(accountId: string): void {
    this.accountSource.next(accountId);
  }

  ///  this works but when I refresh the page I lose all my data  \\\

  // private userSource = new BehaviorSubject('');
  // getUserId(): Observable<string> {
  //   return this.userSource.asObservable();
  // }

  // setUserId(userId: string) {
  //   this.userSource.next(userId);
  // }
}
