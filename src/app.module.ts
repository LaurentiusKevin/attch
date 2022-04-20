import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { UtilsModule } from './utils/utils.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        DatabaseModule,
        UsersModule,
        UtilsModule,
        AuthModule,
        ConfigModule.forRoot({
            ignoreEnvFile: false,
            envFilePath: '.env',
            isGlobal: true,
        })
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
