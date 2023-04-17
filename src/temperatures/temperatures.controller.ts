import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from "@nestjs/common";
import { TemperaturesService } from "./temperatures.service";
import { CreateTemperatureDto } from "./dto/create-temperature.dto";
import { UpdateTemperatureDto } from "./dto/update-temperature.dto";

@Controller("temperatures")
export class TemperaturesController {
	constructor(private readonly temperaturesService: TemperaturesService) {}

	@Post()
	async create(@Body() createTemperatureDto: CreateTemperatureDto) {
		return await this.temperaturesService.create(createTemperatureDto);
	}

	@Get()
	async findAll() {
		return await this.temperaturesService.findAll();
	}

	@Get("dataToChart")
	async getDataToChart () {
		return await this.temperaturesService.getDataToChart();
	}

	@Get("last")
	async getLastTemperature () {
		return await this.temperaturesService.getLast();
	}

	// @Get(":id")
	findOne(@Param("id") id: string) {
		return this.temperaturesService.findOne(id);
	}

	@Get("range/:initialDate/:finalDate")
	async getRange(@Param("initialDate") initialDate: string, @Param("finalDate") finalDate: string) {
		return await this.temperaturesService.getRange(initialDate, finalDate);
	}

	@Get("minDate")
	async getMinDate () {
		return await this.temperaturesService.getMinDate();
	}

	// @Patch(":id")
	// update(
	// 	@Param("id") id: string,
	// 	@Body() updateTemperatureDto: UpdateTemperatureDto,
	// ) {
	// 	return this.temperaturesService.update(id, updateTemperatureDto);
	// }

	// @Delete(":id")
	// remove(@Param("id") id: string) {
	// 	return this.temperaturesService.remove(id);
	// }
}
