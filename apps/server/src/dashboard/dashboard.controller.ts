import { Controller, Delete, Get, Post } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { Roles } from '@/auth.guard';

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
