import { IProduct } from 'product';

import { OrderStatus, OrderType } from '@prisma/client';

export interface newOrderDto {
  /* Product ID */
  productId: number;
}

export interface IOrder {
  id: number;
  type: OrderType;
  status: OrderStatus;
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
}

export interface IAdminOrder extends IOrder {
  user: {
    id: number;
    name: string;
  };
}
