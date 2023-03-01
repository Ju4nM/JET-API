import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { HydratedDocument, Types } from "mongoose";
import { User } from "src/users/schemas/user.schema";

export type LimitTemperatureDocument = HydratedDocument<LimitTemperature>;

@Schema({ timestamps: true })
export class LimitTemperature {

    @Prop({ required: true })
    limitTemperature: number;

    @Prop({ type: Types.ObjectId, ref: User.name, required: true })
    @Type(() => User)
    user: User;
}

export const LimitTemperatureSchema = SchemaFactory.createForClass(LimitTemperature);