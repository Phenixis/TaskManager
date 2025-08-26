import { Module } from '@nestjs/common';
import { LogsService } from './logs.service';
import { DatabaseService } from '../database/database.service';

@Module({
  providers: [LogsService, DatabaseService],
  exports: [LogsService],
})
export class LogsModule {}
