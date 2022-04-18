import { Body, Controller, Delete, Get, HttpStatus, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { Users } from "./users.entity";
import { ChangePasswordDto, CreateUserDto, DeleteUserDto, UpdateUserDto } from "./users.dto";

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(
        private userService: UsersService
    ) {}

    @Get()
    @ApiOperation({summary: 'Get All User'})
    @ApiResponse({status: 403, description: 'Forbidden.'})
    async getAll(@Body() props): Promise<Users[]> {
        return this.userService.findAll()
    }

    @Post()
    @ApiOperation({summary: 'Register User'})
    @ApiResponse({status: 403, description: 'Forbidden.'})
    async register(@Body() props: CreateUserDto): Promise<any> {
        const user = await this.userService.register(props)
        delete user.password

        return {
            statusCode: HttpStatus.OK,
            message: 'success',
            data: user
        }
    }

    @Put()
    @ApiOperation({summary: 'Update data user'})
    @ApiResponse({status: 403, description: 'Forbidden.'})
    async update(@Body() props: UpdateUserDto): Promise<any> {
        const user = await this.userService.update(props)
        delete user.password

        return {
            statusCode: HttpStatus.OK,
            message: 'success',
            data: user
        }
    }

    @Put('change-password')
    @ApiOperation({summary: 'Change Password'})
    @ApiResponse({status: 403, description: 'Forbidden.'})
    async changePassword(@Body() props: ChangePasswordDto): Promise<any> {
        const user = await this.userService.changePassword(props)

        return {
            statusCode: HttpStatus.OK,
            message: 'success',
            data: user
        }
    }

    @Delete()
    @ApiOperation({summary: 'Delete user'})
    @ApiResponse({status: 403, description: 'Forbidden.'})
    async deleteUser(@Body() props: DeleteUserDto): Promise<any> {
        const user = await this.userService.deleteUser(props)

        return {
            statusCode: HttpStatus.OK,
            message: 'User deleted',
            data: user
        }
    }

}
