import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { HydratedDocument, Types } from "mongoose";
import { Notification } from "src/notifications/schemas/notification.schema";
import { User } from "src/users/schemas/user.schema";

export type NotificationDetailDocument = HydratedDocument<NotificationDetail>;

@Schema({ timestamps: true })
export class NotificationDetail {

    @Prop({ type: Types.ObjectId, ref: Notification.name, required: true })
    @Type(() => Notification)
    notification: Notification

	@Prop({ type: Types.ObjectId, ref: User.name, required: true })
	@Type(() => User)
	user: User;
}

export const NotificationDetailSchema = SchemaFactory.createForClass(NotificationDetail);