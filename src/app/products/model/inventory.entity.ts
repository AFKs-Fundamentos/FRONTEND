export class Inventory {
  id?: number;
  userTechnicalId: number;
  productId: number;
  stock: number;
  stockMin: number;
  stockMax: number;

  constructor() {
    this.id = 0;
    this.userTechnicalId = 0;
    this.productId = 0;
    this.stock = 0;
    this.stockMin = 0;
    this.stockMax = 0;
  }
}

