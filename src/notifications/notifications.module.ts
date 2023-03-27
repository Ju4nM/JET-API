import { Module } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import { NotificationsController } from "./notifications.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Notification, NotificationSchema } from "./schemas/notification.schema";
import { NotificationDetailModule } from "src/notification-detail/notification-detail.module";
import { NotificationDetail, NotificationDetailSchema } from "src/notification-detail/schemas/notificationDetail.schema";
import { ChangeHistoryModule } from "src/change-history/change-history.module";
import { User, UserSchema } from "src/users/schemas/user.schema";
import { LimitTemperature, LimitTemperatureSchema } from "src/limit-temperatures/schemas/limit-temperature.schema";

@Module({
	imports: [
		NotificationDetailModule,
		ChangeHistoryModule,
		MongooseModule.forFeature([
			{
				name: Notification.name,
				schema: NotificationSchema
			},
			{
				name: NotificationDetail.name,
				schema: NotificationDetailSchema
			}
		]),
	],
	controllers: [NotificationsController],
	providers: [NotificationsService],
	exports: [NotificationsService]
})
export class NotificationsModule {}
