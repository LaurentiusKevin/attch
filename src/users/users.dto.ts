import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    username: string

    @IsEmail()
    @IsOptional()
    email: string

    @IsNotEmpty()
    password: string
}

export class UpdateUserDto {
    @IsNotEmpty()
    id: number

    @IsNotEmpty()
    @IsOptional()
    name: string

    @IsNotEmpty()
    @IsOptional()
    username: string

    @IsEmail()
    @IsOptional()
    email: string
}

export class ChangePasswordDto {
    @IsNotEmpty()
    id: number

    @IsNotEmpty()
    old_password: string

    @IsNotEmpty()
    new_password: string
}

export class DeleteUserDto {
    @IsNotEmpty()
    id: number
}
