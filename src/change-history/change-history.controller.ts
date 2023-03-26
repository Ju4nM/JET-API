import {
	Controller,
	Get,
	Post,
	Body,
	Param,
} from "@nestjs/common";
import { ChangeHistoryService } from "./change-history.service";
import { CreateChangeHistoryDto } from "./dto/create-change-history.dto";
// import { UpdateChangeHistoryDto } from "./dto/update-change-history.dto";

@Controller("change-history")
export class ChangeHistoryController {
	constructor(private readonly changeHistoryService: ChangeHistoryService) {}

	@Post()
	create(@Body() createChangeHistoryDto: CreateChangeHistoryDto) {
		return this.changeHistoryService.create(createChangeHistoryDto);
	}

	@Get()
	findAll() {
		return this.changeHistoryService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.changeHistoryService.findOne(id);
	}

	// @Put(":id")
	// update(
	// 	@Param("id") id: string,
	// 	@Body() updateChangeHistoryDto: UpdateChangeHistoryDto,
	// ) {
	// 	return this.changeHistoryService.update(id, updateChangeHistoryDto);
	// }

	// @Delete(":id")
	// remove(@Param("id") id: string) {
	// 	return this.changeHistoryService.remove(id);
	// }
}
