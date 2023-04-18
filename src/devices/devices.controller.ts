import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from "@nestjs/common";
import { DevicesService } from "./devices.service";
import { CreateDeviceDto } from "./dto/create-device.dto";
import ToggleFanDto from "./dto/toggleFan.dto";
import { UpdateDeviceDto } from "./dto/update-device.dto";

@Controller("devices")
export class DevicesController {
	constructor(private readonly devicesService: DevicesService) {}

	@Post()
	create(@Body() createDeviceDto: CreateDeviceDto) {
		return this.devicesService.create(createDeviceDto);
	}

	@Post("toggleFan")
	async toggleFan (@Body() toggleFanDto: ToggleFanDto) {
		return this.devicesService.toggleFan(toggleFanDto);
	}

	@Get()
	findAll() {
		return this.devicesService.findAll();
	}

	@Get("current")
	async getCurrent() {
		return await this.devicesService.getCurrentDevices();
	}

	@Get("id/:id")
	findOne(@Param("id") id: string) {
		return this.devicesService.findOne(id);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateDeviceDto: UpdateDeviceDto) {
		return this.devicesService.update(id, updateDeviceDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.devicesService.remove(id);
	}
	
	@Post("setFanAutomatic")
	async setFanAutomatic (@Body() data: ToggleFanDto) {
		return this.devicesService.setFanAutomatic(data);
	}
}
