import { IsBoolean, IsMongoId } from "class-validator";

export class CreateChangeHistoryDto {

    @IsBoolean()
    state: boolean;

    @IsMongoId()
    user: string;
}
