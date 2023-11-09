import { Controller, Delete, Get, Post, Query } from '@nestjs/common';

import { Role, Roles } from '@/common/guards/auth.guard';

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

  @Get('chat/sessions')
  async getAllChatSessions(
    @Query() paginator: { page?: number; limit?: number },
  ) {
    const [data, meta] =
      await this.dashboardService.getAllChatSession(paginator);
    return {
      success: true,
      data,
      meta,
    };
  }
}
