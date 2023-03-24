import { IsMongoId, IsNumber, IsString } from "class-validator";

export class CreateTemperatureDto {

    @IsNumber({allowInfinity: false, allowNaN: false}, {message: "La temeperatura debe ser un numero"})
    // @IsNumber()
    temperature: number;

    @IsMongoId({message: "El ID es invalido"})
    device: string;
}
