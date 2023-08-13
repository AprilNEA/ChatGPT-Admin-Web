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
import { newOrderDto } from '@caw/types';
import { Payload, Roles } from '@/auth.guard';
import { PaymentService } from '@libs/payment';
import { Public } from '@/auth.guard';
import { Role } from '@/prisma/client';
import { JWTPayload } from '@libs/jwt';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private paymentService: PaymentService,
  ) {}

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

  @Get('list/my')
  async listOrder(@Payload('id') uid: number) {
    return this.orderService.listOrder(uid);
  }

  @Roles('admin')
  @Get('list/all')
  async listAllOrder(@Query('uid') uid?: number) {
    return this.orderService.listOrder(uid);
  }

  @Post('new')
  async newOrder(@Payload('id') uid: number, @Body() data: newOrderDto) {
    return await this.orderService.createOrder(uid, data.pid);
  }

  @Public()
  @Post('callback/xunhu')
  async finishOrder(@Req() req: RawBodyRequest<Request>) {
    const oid = await this.paymentService.xhCallback(req.rawBody);
    await this.orderService.finishOrder(oid);
    return 'success';
  }
}
