import { Module } from '@nestjs/common';
import { UsersModule } from "../users/users.module";
import { usersProviders } from "../users/users.providers";
import { UtilsModule } from "../utils/utils.module";
import { UtilsService } from "../utils/utils.service";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./jwt.strategy";

@Module({
    imports: [
        UsersModule,
        UtilsModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn: jwtConstants.expiresIn}
        })
    ],
    controllers: [AuthController],
    providers: [
        ...usersProviders,
        UtilsService,
        AuthService,
        LocalStrategy,
        JwtStrategy,
    ],
    exports: [
        AuthService
    ]
})
export class AuthModule {
}
