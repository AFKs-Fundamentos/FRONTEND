import {OrderType} from './orderType.entity';

export interface Payment {
  orderId: any;
  amount: number;
  clientSecret?: string;
  currency: string;
  status: string;
  description: string;
  orderType: OrderType;
}
