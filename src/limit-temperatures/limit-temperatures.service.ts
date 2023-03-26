import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ChangeHistoryService } from "src/change-history/change-history.service";
import { DevicesService } from "src/devices/devices.service";
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
		private changeHistoryService: ChangeHistoryService
	) {}

	async create(createLimitTemperatureDto: CreateLimitTemperatureDto) {
		
		let user = await this.userService.findOne(createLimitTemperatureDto.user);

		if (user == null || user == undefined)
			throw new HttpException({message: "El usuario no se encontro"}, HttpStatus.CONFLICT);

		let newLimit = new this.LimitTemperatureModel(
			createLimitTemperatureDto,
		);
		let limit = await newLimit.save();

		this.deviceService.updateTemperature(limit._id.toString());

		this.changeHistoryService.create({
			user: user._id.toString(),
			limitTemperature: limit._id.toString(),
			state: null
		});

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
