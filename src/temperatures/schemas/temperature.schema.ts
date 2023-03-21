import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { HydratedDocument, Types } from "mongoose";
import { Device } from "src/devices/schemas/device.schema";

export type TemperatureDocument = HydratedDocument<Temperature>;

@Schema({ timestamps: true })
export class Temperature {
	@Prop({ required: true })
	temperature: number;

	@Prop({ type: Types.ObjectId, ref: Device.name, required: true })
	@Type(() => Device)
	sensor: Device;
}

export const TemperatureSchema = SchemaFactory.createForClass(Temperature);
