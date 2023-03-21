import { IsBoolean, IsMongoId, IsOptional, Length } from "class-validator";
import { LimitTemperature } from "src/limit-temperatures/schemas/limit-temperature.schema";

export class CreateDeviceDto {
	@Length(3, 60)
	deviceName: string;

	@IsMongoId()
	user: string;

	@IsMongoId()
	@IsOptional()
	limitTemperature: LimitTemperature;

	@IsBoolean()
	isSensor: boolean;
}
