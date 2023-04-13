import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ChangeHistoryService } from "src/change-history/change-history.service";
import { DevicesService } from "src/devices/devices.service";
import { NotificationsService } from "src/notifications/notifications.service";
import { UsersService } from "src/users/users.service";
import { CreateLimitTemperatureDto } from "./dto/create-limit-temperature.dto";
import { UpdateLimitTemperatureDto } from "./dto/update-limit-temperature.dto";
import {
	LimitTemperature,
	LimitTemperatureDocument,
} from "./schemas/limit-temperature.schema";

@Injectable()
export class LimitTemperaturesService {
	constructor(
		@InjectModel(LimitTemperature.name)
		private LimitTemperatureModel: Model<LimitTemperatureDocument>,
		private deviceService: DevicesService,
		private userService: UsersService,
		private changeHistoryService: ChangeHistoryService,
		private notificationService: NotificationsService
	) {}

	async create(createLimitTemperatureDto: CreateLimitTemperatureDto) {
		
		let user = await this.userService.findOne(createLimitTemperatureDto.user);

		if (user == null || user == undefined)
			throw new HttpException({message: "El usuario no se encontro"}, HttpStatus.CONFLICT);

		let newLimit = new this.LimitTemperatureModel(
			createLimitTemperatureDto,
		);
		let limit = await newLimit.save();

		await this.deviceService.updateTemperature(limit._id.toString());
		// Create a log in the change history document
		await this.changeHistoryService.create({
			user: user._id.toString(),
			limitTemperature: limit._id.toString(),
			state: null,
			changeType: "limitUpdated"
		});

		await this.notificationService.create({
			user: user._id.toString(),
			limitTemperature: limit._id.toString(),
			title: "Temperatura limite",
			description: "Nueva temperatura limite registrada",
			device: null,
			changeHistory: null
		})

		return limit;
	}

	findAll() {
		return this.LimitTemperatureModel.find().populate("user");
	}

	findOne(id: string) {
		return this.LimitTemperatureModel.findById(id).populate("user");
	}

	update(id: string, updateLimitTemperatureDto: UpdateLimitTemperatureDto) {
		return this.LimitTemperatureModel.findByIdAndUpdate(
			id,
			updateLimitTemperatureDto,
		);
	}

	remove(id: string) {
		return this.LimitTemperatureModel.findByIdAndRemove(id);
	}
}
