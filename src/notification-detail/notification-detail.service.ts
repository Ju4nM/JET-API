import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { NotificationDetailDto } from "./dto/notification-detail.dto";
import { NotificationDetail, NotificationDetailDocument } from "./schemas/notificationDetail.schema";

@Injectable()
export class NotificationDetailService {

    populateOptions = {
        user: {
            path: "user",
            select: {
                password: 0,
                email: 0
            }
        },

        device: {
            path: "device",
            select: {
                user: 0,
                temperatureLimit: 0
            }
        },

        changeHistory: {
            path: "changeHistory", 
            select: {
                user: 0
            }
        },

        limitTemperature: {
            path: "limitTemperature",
            select: {
                user: 0
            }
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
            .populate(this.populateOptions.user)
            .populate(this.populateOptions.device)
            .populate(this.populateOptions.changeHistory)
            .populate(this.populateOptions.limitTemperature)
            .populate("notification");
    }

    async getNotificationDetail (id: string) {
        return await this.NotificationDetailModel.findById(id)
            .populate(this.populateOptions.user)
            .populate(this.populateOptions.device)
            .populate(this.populateOptions.changeHistory)
            .populate(this.populateOptions.limitTemperature)
            .populate("notification");
    }
}
