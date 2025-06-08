export class ShoppingCart {
  id?: number;
  user_client_id: number;
  product_id: number;
  product_name: string;
  product_price: number;
  product_quantity: number;
  status_shopping_cart_item: string;

  constructor() {
    this.id = 0;
    this.user_client_id = 0;
    this.product_id = 0;
    this.product_name = '';
    this.product_price = 0;
    this.product_quantity = 0;
    this.status_shopping_cart_item = '';
  }
}
