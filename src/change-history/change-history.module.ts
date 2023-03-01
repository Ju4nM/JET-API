import { Module } from "@nestjs/common";
import { ChangeHistoryService } from "./change-history.service";
import { ChangeHistoryController } from "./change-history.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { ChangeHistory, ChangeHistorySchema } from "./schemas/change-history.schema";
import { User, UserSchema } from "src/users/schemas/user.schema";

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: ChangeHistory.name,
				schema: ChangeHistorySchema
			},
			{
				name: User.name,
				schema: UserSchema
			}
		]),
	],
	controllers: [ChangeHistoryController],
	providers: [ChangeHistoryService],
})
export class ChangeHistoryModule {}
