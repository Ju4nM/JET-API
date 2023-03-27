import { Module } from "@nestjs/common";
import { DevicesService } from "./devices.service";
import { DevicesController } from "./devices.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Device, DeviceSchema } from "./schemas/device.schema";
import { User, UserSchema } from "src/users/schemas/user.schema";
import {
	LimitTemperature,
	LimitTemperatureSchema,
} from "src/limit-temperatures/schemas/limit-temperature.schema";
import { UsersModule } from "src/users/users.module";
import { ChangeHistoryModule } from "src/change-history/change-history.module";
import { NotificationsModule } from "src/notifications/notifications.module";

@Module({
	imports: [
		UsersModule,
		ChangeHistoryModule,
		NotificationsModule,
		MongooseModule.forFeature([
			{
				name: Device.name,
				schema: DeviceSchema,
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
	controllers: [DevicesController],
	providers: [DevicesService],
	exports: [DevicesService],
})
export class DevicesModule {}
