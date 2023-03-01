import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateSensorDto } from "./dto/create-sensor.dto";
import { UpdateSensorDto } from "./dto/update-sensor.dto";
import { Sensor, SensorDocument } from "./schemas/sensor.schema";

@Injectable()
export class SensorsService {
	
	constructor (
		@InjectModel(Sensor.name) private SensorModel: Model<SensorDocument>
	) {}

	create(createSensorDto: CreateSensorDto) {
		let newSensor = new this.SensorModel(createSensorDto);
		return newSensor.save();
	}

	findAll() {
		return this.SensorModel.find().populate("user").populate("limitTemperature");
	}

	findOne(id: string) {
		return this.SensorModel.findById(id).populate("user").populate("limitTemperature");
	}

	update(id: string, updateSensorDto: UpdateSensorDto) {
		return this.SensorModel.findByIdAndUpdate(id, updateSensorDto);
	}

	remove(id: string) {
		return this.SensorModel.findByIdAndRemove(id);
	}
}
