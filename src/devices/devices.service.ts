import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ChangeHistoryService } from "src/change-history/change-history.service";
import { NotificationsService } from "src/notifications/notifications.service";
import { UsersService } from "src/users/users.service";
import { CreateDeviceDto } from "./dto/create-device.dto";
import DeviceUpdatedResult from "./dto/deviceUpdatedResult.dto";
import ToggleFanDto from "./dto/toggleFan.dto";
import { UpdateDeviceDto } from "./dto/update-device.dto";
import { Device, DeviceDocument } from "./schemas/device.schema";

@Injectable()
export class DevicesService {
	constructor(
		@InjectModel(Device.name) private DeviceModel: Model<DeviceDocument>,
		private userService: UsersService,
		private changeHistoryService: ChangeHistoryService,
		private notificationService: NotificationsService
	) {}

	// this variable specifies what user data will be showed in the response
	selectUserOption = {
		_id: 1,
		userName: 1,
		names: 1,
		firstLastName: 1,
		secondLastName: 1,
	};

	// Options for the temperature population options
	tempPopulateOptions = {
		path: "limitTemperature",
		select: {
			_id: 1,
			limitTemperature: 1,
			user: 1,
		},
		populate: {
			path: "user",
			select: { ...this.selectUserOption },
		},
	};

	async create(createDeviceDto: CreateDeviceDto) {
		let newDevice = new this.DeviceModel(createDeviceDto);
		return await newDevice.save();
	}

	findAll() {
		return this.DeviceModel.find()
			.populate({
				path: "user",
				select: this.selectUserOption,
			})
			.populate(this.tempPopulateOptions);
	}

	async getCurrentDevices() {
		let currentDevices = await this.DeviceModel.find({ isActive: true })
			.populate(this.tempPopulateOptions);
			// .populate({
			// 	path: "user",
			// 	select: this.selectUserOption,
			// })

		if (currentDevices.length == 0) return [];

		let sensor = currentDevices.filter((device: Device) => device.isSensor)[0];
		let noSensor = currentDevices.filter((device: Device) => !device.isSensor)[0];
		
		let mapedData = {
			sensor: {
				id: sensor._id,
				temperatureLimit: sensor.limitTemperature.limitTemperature
			},
			rele: {
				state: noSensor.state,
				automatic: noSensor.automatic
			}
		};

		return mapedData;
	}

	findOne(id: string) {
		return this.DeviceModel.findById(id)
			.populate({
				path: "user",
				select: this.selectUserOption,
			})
			.populate(this.tempPopulateOptions);
	}

	update(id: string, updateDeviceDto: UpdateDeviceDto) {
		return this.DeviceModel.findByIdAndUpdate(id, updateDeviceDto);
	}

	async updateTemperature(idTemperature: string) {
		let updated: DeviceUpdatedResult = await this.DeviceModel.updateOne(
			{ isActive: true },
			{ limitTemperature: idTemperature },
		);
		return updated;
	}

	remove(id: string) {
		return this.DeviceModel.findByIdAndRemove(id);
	}

	async toggleFan (toggleFanDto: ToggleFanDto) {

		let user = await this.userService.findOne(toggleFanDto.user);
		if (user == null) throw new HttpException({message: "Ha ocurrido un error"}, HttpStatus.UNAUTHORIZED);

		let rele: Device = await this.DeviceModel.findOne({isSensor: false});
		if (rele == null) throw new HttpException({message: "No se ha encontrado el dispositivo de la ventilacion"}, HttpStatus.CONFLICT);

		let change = await this.changeHistoryService.create({
			state: !rele.state,
			user: user._id.toString(),
			limitTemperature: undefined,
			changeType: "toggledFan"
		});

		this.notificationService.create({
			changeHistory: change._id.toString(),
			description: `Se ha ${!rele.state ? 'encendido' : 'apagado'} la ventilación`,
			device: null,
			limitTemperature: null,
			user: user._id.toString(),
			title: "Cambio en la ventilación" 
		});

		let deviceUpdated: DeviceUpdatedResult = await this.DeviceModel.updateOne({isSensor: false}, {state: !rele.state});
		let recordUpdated = {... deviceUpdated, releState: !rele.state };
		return recordUpdated;
	}

	async setFanAutomatic (data: ToggleFanDto) {
		
		let user = await this.userService.findOne(data.user);
		if (user == null) throw new HttpException({message: "Ha ocurrido un error"}, HttpStatus.UNAUTHORIZED);

		let rele: Device = await this.DeviceModel.findOne({isSensor: false});
		if (rele == null) throw new HttpException({message: "No se ha encontrado el dispositivo de la ventilacion"}, HttpStatus.CONFLICT);
		
		let deviceUpdated: DeviceUpdatedResult = await this.DeviceModel.updateOne({isSensor: false}, {automatic: !rele.automatic});
		let recordUpdated = {... deviceUpdated, automatic: !rele.automatic};
		return recordUpdated;
	}
}
