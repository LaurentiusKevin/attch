import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [DatabaseModule, UsersModule, UtilsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
