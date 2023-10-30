import { Module } from '@nestjs/common';

import { DatabaseService } from '@/processors/database/database.service';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, DatabaseService],
})
export class UserModule {}
