import { PartialType } from "@nestjs/mapped-types";
import { CreateLimitTemperatureDto } from "./create-limit-temperature.dto";

export class UpdateLimitTemperatureDto extends PartialType(
	CreateLimitTemperatureDto,
) {}
