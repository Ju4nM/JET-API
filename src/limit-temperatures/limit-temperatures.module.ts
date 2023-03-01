import { Module } from "@nestjs/common";
import { LimitTemperaturesService } from "./limit-temperatures.service";
import { LimitTemperaturesController } from "./limit-temperatures.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { LimitTemperature, LimitTemperatureSchema } from "./schemas/limit-temperature.schema";
import { User, UserSchema } from "src/users/schemas/user.schema";

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: LimitTemperature.name,
				schema: LimitTemperatureSchema
			},
			{
				name: User.name,
				schema: UserSchema 
			}
		])
	],
	controllers: [LimitTemperaturesController],
	providers: [LimitTemperaturesService],
})
export class LimitTemperaturesModule {}
