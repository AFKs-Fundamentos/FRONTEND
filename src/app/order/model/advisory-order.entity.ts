export class AdvisoryOrder {
  id?: number;
  userClientId?: number;
  userTechnicalId?: number;
  advisoryId?: number;
  price: number;
  status: string;
  orderType: string;

  constructor( ) {
    this.id = 0;
    this.userClientId = 0;
    this.userTechnicalId = 0;
    this.advisoryId = 0;
    this.price = 0.0;
    this.status = '';
    this.orderType = '';
  }
}
