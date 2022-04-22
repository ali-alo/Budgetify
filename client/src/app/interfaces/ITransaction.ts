export interface ITransaction {
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
