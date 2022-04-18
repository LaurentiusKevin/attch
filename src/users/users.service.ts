import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Users } from "./users.entity";
import { UtilsService } from "../utils/utils.service";
import { ChangePasswordDto, CreateUserDto, DeleteUserDto, UpdateUserDto } from "./users.dto";

@Injectable()
export class UsersService {
    constructor(
        @Inject('USERS_REPOSITORY')
        private usersRepository: typeof Users,
        private readonly utilsService: UtilsService
    ) {}

    async findAll(): Promise<Users[]> {
        return this.usersRepository.findAll<Users>()
    }

    async register(props: CreateUserDto): Promise<Users> {
        const user = new Users();
        user.name = props.name
        user.username = props.username
        user.password = await this.utilsService.hashPassword(props.password)
        if (props.email) user.email = props.email

        return await user.save()
    }

    async update(props: UpdateUserDto): Promise<Users> {
        const user = await this.usersRepository
            .findOne({
                where: {
                    id: props.id
                }
            })

        if (props.name !== undefined) user.name = props.name
        if (props.username !== undefined) user.username = props.username
        if (props.email !== undefined) user.email = props.email

        return await user.save()
    }

    async changePassword(props: ChangePasswordDto): Promise<Users> {
        let user = await this.usersRepository
            .findOne({
                where: {
                    id: props.id
                }
            })

        let checkPassword = await this.utilsService.comparePassword(props.old_password, user.password)

        if (checkPassword !== true) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: [
                    'Old password different from the saved password!'
                ],
                error: 'Bad request'
            }, HttpStatus.BAD_REQUEST)
        }

        user.password = await this.utilsService.hashPassword(props.new_password)

        user = await this.usersRepository
            .findOne({
                attributes: ['id','name','email','username','email_verified_at','last_login_at','created_at','updated_at'],
                where: {
                    id: props.id
                }
            })

        return user
    }

    async deleteUser(props: DeleteUserDto): Promise<any> {
        let user = await this.usersRepository
            .findOne({
                where: {
                    id: props.id
                }
            })

        await user.destroy()

        return user
    }
}
