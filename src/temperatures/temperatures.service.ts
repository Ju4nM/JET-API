import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateTemperatureDto } from "./dto/create-temperature.dto";
// import { UpdateTemperatureDto } from "./dto/update-temperature.dto";
import { Temperature, TemperatureDocument } from "./schemas/temperature.schema";

@Injectable()
export class TemperaturesService {
	
	constructor (
		@InjectModel(Temperature.name) private TemperatureModel: Model<TemperatureDocument>,
	) {}

	async create(createTemperatureDto: CreateTemperatureDto) {
		let newTemperature = new this.TemperatureModel(createTemperatureDto);
		return await newTemperature.save();
	}

	async findAll() {
		return await this.TemperatureModel.find();
	}

	async findOne(id: string) {
		return await this.TemperatureModel.findById(id);
	}

	async getDataToChart () {
		return await this.TemperatureModel.find().sort({$natural: -1}).limit(50);
	}

	async getLast() {
		return await this.TemperatureModel.findOne().sort({$natural: -1});//.limit(1);
	}

	// update(id: number, updateTemperatureDto: UpdateTemperatureDto) {
	// 	return `This action updates a #${id} temperature`;
	// }

	// remove(id: number) {
	// 	return `This action removes a #${id} temperature`;
	// }
}
