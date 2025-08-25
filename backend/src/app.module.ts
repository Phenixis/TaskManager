import { Module } from '@nestjs/common';
import { DatabaseService } from './database/database.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
  imports: [UsersModule, AuthModule],
})
export class AppModule {}
