import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        const user = await this.authService.validateUser({username, password})
        if (!user) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: [
                    'Username or Password does not match!'
                ],
                error: 'Bad request'
            }, HttpStatus.BAD_REQUEST)
        }
        return user
    }
}
