import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { HydratedDocument, Types } from "mongoose";
import { Sensor } from "src/sensors/schemas/sensor.schema";

export type TemperatureDocument = HydratedDocument<Temperature>;

@Schema({ timestamps: true })
export class Temperature {

    @Prop({ required: true })
    temperature: number;

    @Prop({ type: Types.ObjectId, ref: Sensor.name, required: true })
    @Type(() => Sensor)
    sensor: Sensor;
}

export const TemperatureSchema = SchemaFactory.createForClass(Temperature);