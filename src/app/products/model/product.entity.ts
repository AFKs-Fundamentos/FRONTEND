export class Product {
  id: any;
  productName: string;
  photo: string;
  sku: string;
  category: string;
  price: number;
  description: string;
  constructor() {
    this.productName='';
    this.photo='';
    this.sku='';
    this.category='';
    this.price=0.0;
    this.description='';
  }
}
