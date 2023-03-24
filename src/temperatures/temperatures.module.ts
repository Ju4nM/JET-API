import { Module } from "@nestjs/common";
import { TemperaturesService } from "./temperatures.service";
import { TemperaturesController } from "./temperatures.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Temperature, TemperatureSchema } from "./schemas/temperature.schema";

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Temperature.name,
				schema: TemperatureSchema
			}
		])
	],
	controllers: [TemperaturesController],
	providers: [TemperaturesService],
})
export class TemperaturesModule {}
