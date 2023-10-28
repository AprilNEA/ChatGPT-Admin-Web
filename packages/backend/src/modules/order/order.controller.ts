import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import { Role } from '@prisma/client';

import { Payload, Roles } from '@/common/guards/auth.guard';
import { Public } from '@/common/guards/auth.guard';
import { JWTPayload } from '@/libs/jwt/jwt.service';
import { PaymentService } from '@/libs/payment/payment.service';

import { newOrderDto } from 'shared';

import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private paymentService: PaymentService,
  ) {}

  /* 新建订单 */
  @Post('new')
  async newOrder(@Payload('id') uid: number, @Body() data: newOrderDto) {
    return await this.orderService.createOrder(uid, data.pid);
  }

  /* 获取自己的订单 */
  @Get('my')
  async listOrder(@Payload('id') uid: number) {
    return this.orderService.listOrder(uid);
  }

  /* 获取所有订单 */
  @Roles(Role.Admin)
  @Get('all')
  async listAllOrder(@Query('uid') uid?: number) {
    return this.orderService.listOrder(uid);
  }

  /* 支付回调：虎皮椒 */
  @Public()
  @Post('callback/xunhu')
  async finishOrder(@Req() req: RawBodyRequest<Request>) {
    const oid = await this.paymentService.xhCallback(req.rawBody);
    await this.orderService.finishOrder(oid);
    return 'success';
  }
}
