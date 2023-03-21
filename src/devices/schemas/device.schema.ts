import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { User } from "src/users/schemas/user.schema";
import { Type } from "class-transformer";
import { LimitTemperature } from "src/limit-temperatures/schemas/limit-temperature.schema";

export type DeviceDocument = HydratedDocument<Device>;

@Schema({ timestamps: true })
export class Device {
	@Prop({ required: true })
	deviceName: string;

	@Prop({ default: true, required: true })
	state: boolean;

	@Prop({ default: true, required: true })
	isActive: boolean;

	@Prop({ type: Types.ObjectId, ref: User.name, required: true })
	@Type(() => User)
	user: User;

	@Prop({ type: Types.ObjectId, ref: LimitTemperature.name, required: false })
	@Type(() => LimitTemperature)
	limitTemperature: LimitTemperature;

	@Prop({ required: true })
	isSensor: boolean;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
