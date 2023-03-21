import { IsMongoId, IsNumber, IsString } from "class-validator";

export class CreateLimitTemperatureDto {
	@IsNumber()
	temperatureLimit: number;

	@IsString()
	@IsMongoId()
	user: string;
}
