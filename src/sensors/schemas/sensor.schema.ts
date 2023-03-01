import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { User } from "src/users/schemas/user.schema";
import { Type } from "class-transformer";
import { LimitTemperature } from "src/limit-temperatures/schemas/limit-temperature.schema";

export type SensorDocument = HydratedDocument<Sensor>;

@Schema({ timestamps: true })
export class Sensor {

    @Prop({ required: true })
    sensorName: string;

    @Prop({ required: true })
    sensorSerialNumber: string;

    @Prop({ default: true, required: true })
    state: boolean;

    @Prop({ default: true, required: true })
    isActive: boolean;

    @Prop({ type: Types.ObjectId, ref: User.name, required: true })
    @Type(() => User)
    user: User;

    // TODO: do this
    @Prop({ type: Types.ObjectId, ref: LimitTemperature.name, required: true })
    @Type(() => LimitTemperature)
    limitTemperature: LimitTemperature;
}

export const SensorSchema = SchemaFactory.createForClass(Sensor);