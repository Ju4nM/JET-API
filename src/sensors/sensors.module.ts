import { Module } from "@nestjs/common";
import { SensorsService } from "./sensors.service";
import { SensorsController } from "./sensors.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Sensor, SensorSchema } from "./schemas/sensor.schema";
import { User, UserSchema } from "src/users/schemas/user.schema";
import {
	LimitTemperature,
	LimitTemperatureSchema,
} from "src/limit-temperatures/schemas/limit-temperature.schema";

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Sensor.name,
				schema: SensorSchema,
			},
			{
				name: User.name,
				schema: UserSchema,
			},
			{
				name: LimitTemperature.name,
				schema: LimitTemperatureSchema,
			},
		]),
	],
	controllers: [SensorsController],
	providers: [SensorsService],
})
export class SensorsModule {}
