import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { ChangeHistoryModule } from "./change-history/change-history.module";
import { LimitTemperaturesModule } from "./limit-temperatures/limit-temperatures.module";
import { SensorsModule } from "./sensors/sensors.module";
import { TemperaturesModule } from "./temperatures/temperatures.module";
import { NotificationsModule } from "./notifications/notifications.module";
import { NotificationDetailService } from "./notification-detail/notification-detail.service";
import { MongooseModule } from "@nestjs/mongoose";
// import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import * as cors from "cors";

@Module({
	imports: [
		// ConfigModule.forRoot({
		// 	envFilePath: ".env"
		// }),
		MongooseModule.forRoot(
			"mongodb+srv://root:JETToor@jetcluster.drxxpnb.mongodb.net/jetdb",
		),
		UsersModule,
		ChangeHistoryModule,
		LimitTemperaturesModule,
		SensorsModule,
		TemperaturesModule,
		NotificationsModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService, NotificationDetailService],
})
export class AppModule {
	configure (consumer) {
		consumer.apply(cors({
			origin: ['http://jetapptest.somee.com', 'http://localhost:4200'],
			credentials: true,
		}))
		.forRoutes("*");
	}
}
