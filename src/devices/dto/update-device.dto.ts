import { PartialType } from "@nestjs/mapped-types";
import { IsBoolean } from "class-validator";
import { CreateDeviceDto } from "./create-device.dto";

export class UpdateDeviceDto extends PartialType(CreateDeviceDto) {}
