import {
	Controller,
	Get,
	Post,
	Body,
	Put,
	Param,
	Delete,
} from "@nestjs/common";
import { LimitTemperaturesService } from "./limit-temperatures.service";
import { CreateLimitTemperatureDto } from "./dto/create-limit-temperature.dto";
import { UpdateLimitTemperatureDto } from "./dto/update-limit-temperature.dto";

@Controller("limit-temperatures")
export class LimitTemperaturesController {
	constructor(
		private readonly limitTemperaturesService: LimitTemperaturesService,
	) {}

	@Post()
	create(@Body() createLimitTemperatureDto: CreateLimitTemperatureDto) {
		return this.limitTemperaturesService.create(createLimitTemperatureDto);
	}

	@Get()
	findAll() {
		return this.limitTemperaturesService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.limitTemperaturesService.findOne(id);
	}

	@Put(":id")
	update(
		@Param("id") id: string,
		@Body() updateLimitTemperatureDto: UpdateLimitTemperatureDto,
	) {
		return this.limitTemperaturesService.update(
			id,
			updateLimitTemperatureDto,
		);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.limitTemperaturesService.remove(id);
	}
}
