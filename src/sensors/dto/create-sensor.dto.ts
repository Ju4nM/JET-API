import { IsMongoId, IsString, MaxLength } from "class-validator";

export class CreateSensorDto {

    @IsString()
    @MaxLength(30)
    sensorName: string;

    @IsString()
    @MaxLength(30)
    sensorSerialNumber: string;

    @IsString()
    @IsMongoId()
    user: string;

    @IsString()
    @IsMongoId()
    limitTemperature: string;
}
