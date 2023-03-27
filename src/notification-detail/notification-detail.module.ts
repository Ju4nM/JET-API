import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChangeHistory, ChangeHistorySchema } from 'src/change-history/schemas/change-history.schema';
import { LimitTemperature, LimitTemperatureSchema } from 'src/limit-temperatures/schemas/limit-temperature.schema';
import { Notification, NotificationSchema } from 'src/notifications/schemas/notification.schema';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { NotificationDetailService } from './notification-detail.service';
import { NotificationDetail, NotificationDetailSchema } from './schemas/notificationDetail.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: NotificationDetail.name,
                schema: NotificationDetailSchema
            },
            {
                name: Notification.name,
                schema: NotificationSchema
            },
            {
                name: User.name,
                schema: UserSchema
            },
            {
                name: ChangeHistory.name,
                schema: ChangeHistorySchema
            },
            {
                name: LimitTemperature.name,
                schema: LimitTemperatureSchema 
            }
        ])
    ],
    providers: [NotificationDetailService],
    exports: [NotificationDetailService]
})
export class NotificationDetailModule {}
