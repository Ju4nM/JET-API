import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateLimitTemperatureDto } from "./dto/create-limit-temperature.dto";
import { UpdateLimitTemperatureDto } from "./dto/update-limit-temperature.dto";
import { LimitTemperature, LimitTemperatureDocument } from "./schemas/limit-temperature.schema";

@Injectable()
export class LimitTemperaturesService {

	constructor (
		@InjectModel(LimitTemperature.name) private LimitTemperatureModel: Model<LimitTemperatureDocument>
	) {}

	create(createLimitTemperatureDto: CreateLimitTemperatureDto) {
		let newLimit = new this.LimitTemperatureModel(createLimitTemperatureDto);
		return newLimit.save();
	}

	findAll() {
		return this.LimitTemperatureModel.find().populate("user");
	}

	findOne(id: string) {
		return this.LimitTemperatureModel.findById(id).populate("user");
	}

	update(id: string, updateLimitTemperatureDto: UpdateLimitTemperatureDto) {
		return this.LimitTemperatureModel.findByIdAndUpdate(id, updateLimitTemperatureDto);
	}

	remove(id: string) {
		return this.LimitTemperatureModel.findByIdAndRemove(id);
	}
}
