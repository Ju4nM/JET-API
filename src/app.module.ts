import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { ChangeHistoryModule } from "./change-history/change-history.module";
import { LimitTemperaturesModule } from "./limit-temperatures/limit-temperatures.module";
import { TemperaturesModule } from "./temperatures/temperatures.module";
import { NotificationsModule } from "./notifications/notifications.module";
import { NotificationDetailService } from "./notification-detail/notification-detail.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { DevicesModule } from "./devices/devices.module";
import { NotificationDetailModule } from './notification-detail/notification-detail.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: ".env",
		}),
		MongooseModule.forRoot(process.env.DATABASE_URI),
		UsersModule,
		ChangeHistoryModule,
		LimitTemperaturesModule,
		TemperaturesModule,
		NotificationsModule,
		AuthModule,
		DevicesModule,
		NotificationDetailModule,
	],
	controllers: [AppController],
	providers: [AppService, NotificationDetailService],
})
export class AppModule {}
