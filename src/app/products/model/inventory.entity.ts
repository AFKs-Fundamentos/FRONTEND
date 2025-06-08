export class Inventory {
  id?: number;
  user_technical_id: number;
  product_id: number;
  stock: number;
  stock_min: number;
  stock_max: number;

  constructor() {
    this.id = 0;
    this.user_technical_id = 0;
    this.product_id = 0;
    this.stock = 0;
    this.stock_min = 0;
    this.stock_max = 0;
  }
}

