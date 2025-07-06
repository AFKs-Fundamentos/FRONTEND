export class Payment {
  orderId: string;
  amount: number;
  clientSecret: string;
  currency: string;
  status: string;
  description: string;
  orderType: string;
  constructor() {
    this.orderId = '';
    this.amount = 0;
    this.clientSecret = '';
    this.currency = '';
    this.status = '';
    this.description = '';
    this.orderType = '';
  }
}
