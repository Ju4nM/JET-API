import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
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
            }
        ])
    ],
    providers: [NotificationDetailService],
    exports: [NotificationDetailService]
})
export class NotificationDetailModule {}
