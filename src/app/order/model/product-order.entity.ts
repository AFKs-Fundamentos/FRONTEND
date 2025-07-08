export class ProductOrder {
  id?: number;
  userClientId?: number;
  totalPrice: number;
  currency: string;
  shoppingCartId?: number;
  status: string;
  orderType: string;

  constructor() {
    this.id = 0;
    this.userClientId = 0;
    this.totalPrice = 0.0;
    this.currency = '';
    this.shoppingCartId = 0;
    this.orderType = '';
    this.status = '';
    this.orderType = '';
  }
}
