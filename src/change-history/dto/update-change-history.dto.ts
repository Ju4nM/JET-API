import { PartialType } from "@nestjs/mapped-types";
import { CreateChangeHistoryDto } from "./create-change-history.dto";

export class UpdateChangeHistoryDto extends PartialType(
	CreateChangeHistoryDto,
) {}
