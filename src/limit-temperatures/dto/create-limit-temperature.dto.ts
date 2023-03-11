import { IsMongoId, IsNumber, IsString } from "class-validator";

export class CreateLimitTemperatureDto {
	@IsNumber()
	limitTemperature: number;

	@IsString()
	@IsMongoId()
	user: string;
}
