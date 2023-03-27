import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { HydratedDocument, Types } from "mongoose";
import { ChangeHistory } from "src/change-history/schemas/change-history.schema";
import { Device } from "src/devices/schemas/device.schema";
import { LimitTemperature } from "src/limit-temperatures/schemas/limit-temperature.schema";
import { Notification } from "src/notifications/schemas/notification.schema";
import { User } from "src/users/schemas/user.schema";

export type NotificationDetailDocument = HydratedDocument<NotificationDetail>;

@Schema({ timestamps: true })
export class NotificationDetail {

    @Prop({ type: Types.ObjectId, ref: Notification.name, required: true })
    @Type(() => Notification)
    notification: Notification

	@Prop({ type: Types.ObjectId, ref: User.name, default: null })
	@Type(() => User)
	user: User;

	@Prop({ type: Types.ObjectId, ref: Device.name, default: null })
	@Type(() => Device)
	device: Device;

	@Prop({ type: Types.ObjectId, ref: LimitTemperature.name, default: null })
	@Type(() => LimitTemperature)
	limitTemperature: LimitTemperature;

	@Prop({ type: Types.ObjectId, ref: ChangeHistory.name, default: null })
	@Type(() => ChangeHistory)
	changeHistory: ChangeHistory;
}

export const NotificationDetailSchema = SchemaFactory.createForClass(NotificationDetail);