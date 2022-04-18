import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Users } from "../users/users.entity";
import { UtilsService } from "../utils/utils.service";
import { LoginDto } from "./auth.dto";
import { use } from "passport";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        @Inject('USERS_REPOSITORY') private usersRepository: typeof Users,
        private readonly utilsService: UtilsService,
        private jwtService: JwtService
    ) {}

    async validateUser(props: LoginDto): Promise<any> {
        const user = await this.usersRepository.findOne({
            where: {
                username: props.username
            }
        })

        if (user !== null) {
            const checkPassword = await this.utilsService.comparePassword(props.password,user.password)
            if (checkPassword == true) {
                return user
            }
        }

        return null
    }

    async login(user: Users): Promise<any> {
        const payload = {
            user_id: user.id,
            username: user.username,
            name: user.name,
            email: user.email
        }

        return {
            user: payload,
            access_token: this.jwtService.sign(payload)
        }
    }
}
