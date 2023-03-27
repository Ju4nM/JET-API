import { IsBoolean, IsMongoId, IsOptional, Length } from "class-validator";

export class CreateNotificationDto {

    @Length(5, 50, {message: "El titulo debe tener entre 5 y 50 caracteres"})
    title: string;
    
    @Length(5, 1000, {message: "La descripcion debe tener entre 5 y 100 caracteres"})
    description: string;

    @IsOptional()
    @IsMongoId({message: "El ID de usuario no es valido"})
    user: string;

    @IsOptional()
    @IsMongoId({message: "El ID de dispositivo no es valido"})
    device: string;

    @IsOptional()
    @IsMongoId({message: "El ID de limite de temeperatura no es valido"})
    limitTemperature: string;

    @IsOptional()
    @IsMongoId({message: "El ID del cambio no es valido"})
    changeHistory: string;
}
