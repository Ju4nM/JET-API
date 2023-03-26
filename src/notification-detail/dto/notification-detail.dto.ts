import { IsMongoId, IsOptional } from "class-validator";


export class NotificationDetailDto {

    @IsMongoId()
    notification: string;

    @IsOptional()
    @IsMongoId()
    user: string;

    @IsOptional()
    @IsMongoId()
    device: string;
}