import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ChangeHistoryService } from "src/change-history/change-history.service";
import { NotificationDetailService } from "src/notification-detail/notification-detail.service";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { Notification, NotificationDocument } from "./schemas/notification.schema";

@Injectable()
export class NotificationsService {
	
	constructor (
		@InjectModel(Notification.name) private NotificationModel: Model<NotificationDocument>,
		private notificationDetailService: NotificationDetailService,
		private changeHistoryService: ChangeHistoryService
	) {}

	async create(createNotificationDto: CreateNotificationDto) {
		let newNotification = new this.NotificationModel(createNotificationDto);
		let notificationCreated = await newNotification.save();
		let notificationCompleted = null;
		
		notificationCompleted = await this.notificationDetailService.createNotificationDetail({
			...createNotificationDto,
			notification: notificationCreated._id.toString()
		});
		
		return notificationCompleted;
	}

	async findAll() {
		return await this.notificationDetailService.getAllNotificationsDetails();
	}

	async findOne(id: string) {
		return await this.notificationDetailService.getNotificationDetail(id);
	}

	// update(id: number, updateNotificationDto: UpdateNotificationDto) {
	// 	return `This action updates a #${id} notification`;
	// }

	// remove(id: number) {
	// 	return `This action removes a #${id} notification`;
	// }
}
