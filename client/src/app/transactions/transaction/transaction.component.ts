import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent {
  @Input() title = '';
  @Input() amount = 0;
  @Input() categoryIds!: string[];
  @Input() paymentDate!: Date;
  @Input() isIncome!: boolean;

  constructor() {}
}
