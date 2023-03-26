import {
	Controller,
	Get,
	Post,
	Body,
	// Patch,
	Param,
	// Delete,
} from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";

@Controller("notifications")
export class NotificationsController {
	constructor(private readonly notificationsService: NotificationsService) {}

	@Post()
	async create(@Body() createNotificationDto: CreateNotificationDto) {
		return await this.notificationsService.create(createNotificationDto);
	}

	@Get()
	async findAll() {
		return await this.notificationsService.findAll();
	}

	@Get(":id")
	async findOne(@Param("id") id: string) {
		return await this.notificationsService.findOne(id);
	}

	// @Patch(":id")
	// update(
	// 	@Param("id") id: string,
	// 	@Body() updateNotificationDto: UpdateNotificationDto,
	// ) {
	// 	return this.notificationsService.update(+id, updateNotificationDto);
	// }

	// @Delete(":id")
	// remove(@Param("id") id: string) {
	// 	return this.notificationsService.remove(+id);
	// }
}
