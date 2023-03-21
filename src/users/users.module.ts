import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema, User } from "./schemas/user.schema";
import { JwtStrategy } from "src/auth/guards/jwt.strategy";

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: User.name,
				schema: UserSchema,
			},
		]),
	],
	controllers: [UsersController],
	providers: [UsersService, JwtStrategy],
	exports: [UsersService],
})
export class UsersModule {}
