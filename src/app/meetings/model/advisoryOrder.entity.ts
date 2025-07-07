export class AdvisoryOrder {
  id?: number;
  userClientId?: number;
  userTechnicalId?: number;
  appointmentId?: number;
  price?: number;
  status?: string;

  constructor() {
    this.id = 0;
    this.userClientId = 0;
    this.userTechnicalId = 0;
    this.appointmentId = 0;
    this.price = 0;
    this.status = '';
  }
}
