import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  @Input() name = '';
  @Input() balance = 0;
  @Input() isActive = false;

  constructor() {}
}
