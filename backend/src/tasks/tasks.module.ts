import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { UsersModule } from 'src/users/users.module';
import { DatabaseService } from '../database/database.service';

@Module({
  imports: [
    UsersModule
  ],
  providers: [TasksService, DatabaseService],
  controllers: [TasksController]
})
export class TasksModule { }
