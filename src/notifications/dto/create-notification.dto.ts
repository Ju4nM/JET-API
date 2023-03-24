import { IsMongoId, Length } from "class-validator";

export class CreateNotificationDto {

    @Length(5, 50, {message: "El titulo debe tener entre 5 y 50 caracteres"})
    title: string;
    
    @Length(5, 1000, {message: "La descripcion debe tener entre 5 y 100 caracteres"})
    description: string;

    @IsMongoId({message: "El ID no es valido"})
    user: string;
}
