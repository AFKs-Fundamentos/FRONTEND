export class Payment {
  cartShoppingId string;
  amount: number;
  currency: string;
  status: string;
  description: string;
  receiptEmail:string;
  constructor() {
    this.cartShoppingId = '';
    this.amount = 0;
    this.currency = '';
    this.status = '';
    this.description = '';
    this.receiptEmail = '';
  }
}
