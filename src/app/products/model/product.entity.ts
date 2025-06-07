export class Product {
  id: number;
  productName: string;
  photo: string;
  sku: string;
  category: string;
  price: number;
  description: string;
  isFavorite?: boolean;
  characteristic_id: number;
  constructor() {
    this.id=0;
    this.productName='';
    this.photo='';
    this.sku='';
    this.category='';
    this.price=0.0;
    this.description='';
    this.isFavorite=false;
    this.characteristic_id=0;
  }
}
