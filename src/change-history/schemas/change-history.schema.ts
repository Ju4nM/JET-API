import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, now, Types } from "mongoose";
import { Type } from "class-transformer";
import { User } from "src/users/schemas/user.schema";
import { LimitTemperature } from "src/limit-temperatures/schemas/limit-temperature.schema";

export type ChangeHistoryDocument = HydratedDocument<ChangeHistory>;

@Schema()
export class ChangeHistory {
	@Prop({ default: now, required: true })
	dateOfChange: Date;

	@Prop({ default: null })
	state: boolean;

	@Prop({ type: Types.ObjectId, ref: User.name, default: null})
	@Type(() => User)
	user: User;

	@Prop({ type: Types.ObjectId, ref: LimitTemperature.name, default: null})
	@Type(() => LimitTemperature)
	limitTemperature: LimitTemperature;
}

export const ChangeHistorySchema = SchemaFactory.createForClass(ChangeHistory);
