import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { HydratedDocument, Types } from "mongoose";
import { Device } from "src/devices/schemas/device.schema";
import { Notification } from "src/notifications/schemas/notification.schema";
import { User } from "src/users/schemas/user.schema";

export type NotificationDetailDocument = HydratedDocument<NotificationDetail>;

@Schema({ timestamps: true })
export class NotificationDetail {

    @Prop({ type: Types.ObjectId, ref: Notification.name, required: true })
    @Type(() => Notification)
    notification: Notification

	@Prop({ type: Types.ObjectId, ref: User.name, required: true, default: null })
	@Type(() => User)
	user: User;

	@Prop({ type: Types.ObjectId, ref: Device.name, required: true, default: null })
	@Type(() => Device)
	device: Device;
}

export const NotificationDetailSchema = SchemaFactory.createForClass(NotificationDetail);