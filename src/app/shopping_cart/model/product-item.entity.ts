export class ProductItem {
  id?: number;
  productId?: number;
  productName: string;
  productPrice: number;
  quantity: number;
  statusCartShoppingItem: string;
  shoppingCartId: number;
  constructor() {
    this.id = 0;
    this.productId = 0;
    this.productName = '';
    this.productPrice = 0;
    this.quantity = 0;
    this.statusCartShoppingItem = '';
    this.shoppingCartId = 0;
  }
}
