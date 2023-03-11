import { PartialType } from "@nestjs/mapped-types";
import { IsBoolean } from "class-validator";
import { CreateSensorDto } from "./create-sensor.dto";

export class UpdateSensorDto extends PartialType(CreateSensorDto) {
	@IsBoolean()
	state: boolean;

	@IsBoolean()
	isActive: boolean;
}
