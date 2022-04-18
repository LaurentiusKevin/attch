import { Module } from '@nestjs/common';
import { DatabaseModule } from "../database/database.module";
import { UsersService } from "./users.service";
import { usersProviders } from "./users.providers";
import { UsersController } from './users.controller';
import { UtilsModule } from "../utils/utils.module";
import { UtilsService } from "../utils/utils.service";

@Module({
    imports: [
        DatabaseModule,
        UtilsModule,
    ],
    providers: [
        UsersService,
        UtilsService,
        ...usersProviders
    ],
    controllers: [UsersController]
})
export class UsersModule {}
