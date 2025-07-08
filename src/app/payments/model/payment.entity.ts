import {OrderType} from './orderType.entity';

export interface Payment {
  orderId: number;
  amount: number;
  client_secret?: string;
  currency: string;
  status: string;
  description: string;
  orderType: OrderType;
}
