import { Module, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { DatabaseService } from './database/database.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { LogsModule } from './logs/logs.module';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
  imports: [UsersModule, AuthModule, TasksModule, LogsModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // toutes les routes
  }
}