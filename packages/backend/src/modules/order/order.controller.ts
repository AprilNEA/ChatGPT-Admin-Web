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
import { OrderService } from './order.service';
import { newOrderDto } from 'shared';
import { Payload, Roles } from '@/common/guards/auth.guard';
import { PaymentService } from '@/libs/payment/payment.service';
import { Public } from '@/common/guards/auth.guard';
import { Role } from '@prisma/client';
import { JWTPayload } from '@/libs/jwt/jwt.service';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private paymentService: PaymentService,
  ) {}

  /* 获取某一用户的订单 */
  @Roles('admin', 'user')
  @Get('find/:id')
  async findOrder(@Payload() payload: JWTPayload, @Param('id') oid: string) {
    switch (payload.role) {
      case Role.Admin:
        return await this.orderService.findOrder(oid);
      case Role.User:
        return await this.orderService.findOrder(oid, payload.id);
    }
  }

  /* 获取自己的订单 */
  @Get('list/my')
  async listOrder(@Payload('id') uid: number) {
    return this.orderService.listOrder(uid);
  }

  /* 获取所有订单 */
  @Roles('admin')
  @Get('list/all')
  async listAllOrder(@Query('uid') uid?: number) {
    return this.orderService.listOrder(uid);
  }

  /* 新建订单 */
  @Post('new')
  async newOrder(@Payload('id') uid: number, @Body() data: newOrderDto) {
    return await this.orderService.createOrder(uid, data.pid);
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
