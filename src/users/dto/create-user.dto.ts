import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    @MaxLength(15)
    firstName: string;

    @IsString()
    @MaxLength(15)
    secondName: string;

    @IsString()
    @MaxLength(15)
    firstLastName: string;

    @IsString()
    @MaxLength(15)
    secondLastName: string;

    @IsString()
    @MaxLength(15)
    userName: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(60)
    password: string;
}
