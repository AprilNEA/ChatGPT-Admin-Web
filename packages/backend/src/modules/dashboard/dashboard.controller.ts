import { Controller, Delete, Get, Post } from '@nestjs/common';

import { Roles } from '@/common/guards/auth.guard';

import { DashboardService } from './dashboard.service';

@Roles('admin')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('openai/keys')
  async listOpenaiKeys() {
    return this.dashboardService.listOpenaiKeys();
  }

  @Post('openai/keys')
  async addOpenaiKey() {}

  @Delete('openai/keys/:id')
  async deleteOpenaiKey() {}
}
