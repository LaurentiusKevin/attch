import { Controller, Request, Post, UseGuards, HttpStatus } from '@nestjs/common';
import { LocalAuthGuard } from "./local.guard";
import { AuthService } from "./auth.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() param) {
        const user = await this.authService.login(param.user)

        return {
            statusCode: HttpStatus.OK,
            message: 'success',
            data: user
        }
    }
}
