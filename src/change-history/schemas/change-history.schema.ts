import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, now, Types } from "mongoose";
import { Type } from "class-transformer";
import { User } from "src/users/schemas/user.schema";

export type ChangeHistoryDocument = HydratedDocument<ChangeHistory>;

@Schema()
export class ChangeHistory {
	@Prop({ default: now, required: true })
	dateOfChange: Date;

	@Prop({ required: true })
	state: boolean;

	@Prop({ type: Types.ObjectId, ref: User.name })
	@Type(() => User)
	user: User;
}

export const ChangeHistorySchema = SchemaFactory.createForClass(ChangeHistory);
