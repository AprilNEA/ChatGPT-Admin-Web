import { FastifyRequest } from 'fastify';

import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import { Role } from '@prisma/client';

import { Payload, Roles } from '@/common/guards/auth.guard';
import { Public } from '@/common/guards/auth.guard';
import { ZodValidationPipe } from '@/common/pipes/zod';
import { JWTPayload } from '@/libs/jwt/jwt.service';
import { PaymentService } from '@/libs/payment/payment.service';

import { OrderDTO } from 'shared';

import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private paymentService: PaymentService,
  ) {}

  /* 新建订单 */
  @Post('new')
  async newOrder(
    @Payload('id') userId: number,
    @Body(new ZodValidationPipe(OrderDTO.NewOrderSchema))
    body: OrderDTO.NewOrderDto,
  ) {
    const order = await this.orderService.createOrder(userId, body.productId);
    // TODO 防止短时间内重复产生订单
    const result = await this.paymentService.xhStartPay({
      orderId: order.id,
      price: order.amount,
      attach: '',
      title: 'AI产品',
    });
    return {
      success: true,
      data: {
        url: result.url,
        qrcode: result.url_qrcode,
      },
    };
  }

  /* 获取自己的订单 */
  @Get('my')
  async listOrder(@Payload('id') userId: number) {
    return this.orderService.listOrder(userId);
  }

  /* 获取所有订单 */
  @Roles(Role.Admin)
  @Get('all')
  async listAllOrder(@Query('userId') userId?: number) {
    return this.orderService.listOrder(userId);
  }

  /* 支付回调：虎皮椒 */
  @Public()
  @Post('callback/xunhu')
  @HttpCode(200)
  async finishOrder(@Req() req: RawBodyRequest<FastifyRequest>) {
    const raw = req.body;
    const orderId = await this.paymentService.xhCallback(raw);
    await this.orderService.finishOrder(orderId);
    return 'success';
  }
}
