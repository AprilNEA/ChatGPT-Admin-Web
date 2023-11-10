import { Controller, Delete, Get, Post, Query } from '@nestjs/common';

import { Role, Roles } from '@/common/guards/auth.guard';
import { JoiValidationPipe } from '@/common/pipes/joi';
import { PagerQuery, PagerQuerySchema } from '@/shared';

import { DashboardService } from './dashboard.service';

@Roles(Role.Admin)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('analytics')
  async getAnalytics() {
    return {
      success: true,
      data: await this.dashboardService.getAnalytics(),
    };
  }

  @Get('openai/keys')
  async listOpenaiKeys() {
    return this.dashboardService.listOpenaiKeys();
  }

  @Post('openai/keys')
  async addOpenaiKey() {}

  @Delete('openai/keys/:id')
  async deleteOpenaiKey() {}

  /* 查看用户所有对话 */
  @Get('chat/sessions')
  async getAllChatSessions(
    @Query(new JoiValidationPipe(PagerQuerySchema))
    paginator: PagerQuery,
  ) {
    const [data, meta] =
      await this.dashboardService.getAllChatSession(paginator);
    return {
      success: true,
      data,
      meta,
    };
  }

  /* 查看用户所有消息 */
  @Get('chat/messages')
  async getAllMessages(
    @Query(new JoiValidationPipe(PagerQuerySchema))
    paginator: PagerQuery,
  ) {
    const [data, meta] = await this.dashboardService.getAllMessages(paginator);
    return {
      success: true,
      data,
      meta,
    };
  }

  /* 查看所有订单 */
  @Get('orders')
  async getAllOrders(
    @Query(new JoiValidationPipe(PagerQuerySchema))
    paginator: PagerQuery,
  ) {
    const [data, meta] = await this.dashboardService.getAllOrders(paginator);
    return {
      success: true,
      data,
      meta,
    };
  }

  /* 查看所有用户 */
  @Get('users')
  async getAllUsers(
    @Query(new JoiValidationPipe(PagerQuerySchema))
    paginator: PagerQuery,
  ) {
    const [data, meta] = await this.dashboardService.getAllUsers(paginator);
    return {
      success: true,
      data,
      meta,
    };
  }
}
