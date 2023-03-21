import { IsMongoId } from "class-validator";

export default class ToggleFanDto {
    
    @IsMongoId()
    user: string;
}