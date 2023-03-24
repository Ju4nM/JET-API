import { Module } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import { NotificationsController } from "./notifications.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Notification, NotificationSchema } from "./schemas/notification.schema";
import { NotificationDetailModule } from "src/notification-detail/notification-detail.module";

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Notification.name,
				schema: NotificationSchema
			}
		]),
		NotificationDetailModule
	],
	controllers: [NotificationsController],
	providers: [NotificationsService],
})
export class NotificationsModule {}
