import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { NotificationDetailDto } from "./dto/notification-detail.dto";
import { NotificationDetail, NotificationDetailDocument } from "./schemas/notificationDetail.schema";

@Injectable()
export class NotificationDetailService {

    userPopulateOptions = {
        path: "user",
        select: {
            password: 0,
            email: 0
        }
    }

    devicePopulateOptions = {
        path: "device",
        select: {
            user: 0,
            temperatureLimit: 0
        }
    }

    constructor (
        @InjectModel(NotificationDetail.name) private NotificationDetailModel: Model<NotificationDetailDocument>
    ) {}

    async createNotificationDetail (createNotificationDetailDto: NotificationDetailDto) {
        let newNotificationDetail = new this.NotificationDetailModel(createNotificationDetailDto);
        return await newNotificationDetail.save();
    }

    async getAllNotificationsDetails () {
        return await this.NotificationDetailModel.find()
            .populate(this.userPopulateOptions)
            .populate(this.devicePopulateOptions);
    }

    async getNotificationDetail (id: string) {
        return await this.NotificationDetailModel.findById(id)
            .populate(this.userPopulateOptions)
            .populate(this.devicePopulateOptions);
    }
}
