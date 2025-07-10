import {ProductItem} from './product-item.entity';

export class ShoppingCart {
  id?: number;
  userClientId?: number;
  productItems: ProductItem[];

  constructor() {
    this.id = 0;
    this.userClientId = 0;
    this.productItems = [];
  }
}
