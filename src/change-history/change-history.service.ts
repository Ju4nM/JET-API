import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateChangeHistoryDto } from "./dto/create-change-history.dto";
import { UpdateChangeHistoryDto } from "./dto/update-change-history.dto";
import { ChangeHistory, ChangeHistoryDocument } from "./schemas/change-history.schema";

@Injectable()
export class ChangeHistoryService {
	
	constructor (
		@InjectModel(ChangeHistory.name) private ChangeHistoryModel: Model<ChangeHistoryDocument>
	) {}

	create(createChangeHistoryDto: CreateChangeHistoryDto) {
		let newRecord = new this.ChangeHistoryModel(createChangeHistoryDto);
		return newRecord.save();
	}

	findAll() {
		return this.ChangeHistoryModel.find().populate("user");
	}

	findOne(id: string) {
		return this.ChangeHistoryModel.findById(id).populate("user");
	}

	update(id: string, updateChangeHistoryDto: UpdateChangeHistoryDto) {
		return this.ChangeHistoryModel.findByIdAndUpdate(id, updateChangeHistoryDto);
	}

	remove(id: string) {
		return this.ChangeHistoryModel.findByIdAndRemove(id);
	}
}
