import { IsBoolean, IsMongoId, IsOptional, IsString } from "class-validator";

export class CreateChangeHistoryDto {

	@IsOptional()
	@IsBoolean()
	state: boolean;

	@IsMongoId({message: "El ID de usuario es incorrecto"})
	user: string;

	@IsOptional()
	@IsMongoId({message: "El ID de temperatura es incorrecto"})
	limitTemperature: string;

	@IsString()
	changeType: string;
}
