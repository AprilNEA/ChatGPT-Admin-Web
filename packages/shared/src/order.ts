import { IProduct } from 'product';

import { OrderStatus, OrderType } from '@prisma/client';

export interface newOrderDto {
  /* Product ID */
  productId: number;
}

export type IOrder = {
  id: number;
  type: OrderType;
  status: OrderStatus;
  // type: any;
  // status: any;
  count: number;
  amount: number;
  startAt: string;
  endAt: string;
  isCurrent: boolean;
  userId: number;
  productId: number;
  createdAt: string;
  updatedAt: string;
  product: IProduct;
};
