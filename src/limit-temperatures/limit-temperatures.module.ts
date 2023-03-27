import { Module } from "@nestjs/common";
import { LimitTemperaturesService } from "./limit-temperatures.service";
import { LimitTemperaturesController } from "./limit-temperatures.controller";
import { MongooseModule } from "@nestjs/mongoose";
import {
	LimitTemperature,
	LimitTemperatureSchema,
} from "./schemas/limit-temperature.schema";
import { User, UserSchema } from "src/users/schemas/user.schema";
import { DevicesModule } from "src/devices/devices.module";
import { UsersModule } from "src/users/users.module";
import { ChangeHistoryModule } from "src/change-history/change-history.module";
import { NotificationsModule } from "src/notifications/notifications.module";

@Module({
	imports: [
		DevicesModule,
		UsersModule,
		ChangeHistoryModule,
		NotificationsModule,
		MongooseModule.forFeature([
			{
				name: LimitTemperature.name,
				schema: LimitTemperatureSchema,
			},
			{
				name: User.name,
				schema: UserSchema,
			},
		]),
	],
	controllers: [LimitTemperaturesController],
	providers: [LimitTemperaturesService],
})
export class LimitTemperaturesModule {}
