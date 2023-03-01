import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({
	timestamps: true
})
export class User {
	@Prop({required: true})
	firstName: string;

	@Prop({required: true})
	secondName: string;

	@Prop({required: true})
	firstLastName: string;

	@Prop({required: true})
	secondLastName: string;

	@Prop({ unique: true, required: true })
	userName: string;

	@Prop({ unique: true, required: true })
	email: string;

	@Prop({required: true})
	password: string;

	@Prop({ default: false, required: true })
	userType: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
