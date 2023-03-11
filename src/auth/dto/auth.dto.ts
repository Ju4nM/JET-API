import { IsString } from "class-validator";

export class AuthDto{
    
    @IsString({message: "El nombre de usuario debe ser una cadena de texto"})
    userName: string;
    
    @IsString({message: "La contraseña debe ser una cadena de texto"})
    password: string;
}
