import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserDocument } from "./schemas/user.schema";
import { hash } from "bcrypt";

@Injectable()
export class UsersService {
	
	constructor (
		@InjectModel(User.name) private UserModel: Model<UserDocument>
	) {}

	async create(createUserDto: CreateUserDto) {
		let { password } = createUserDto;
		let passwordHashed = await hash(password, 8);
		let newUser = new this.UserModel({ ...createUserDto, password: passwordHashed });
		return newUser.save();
	}

	findAll() {
		return this.UserModel.find();
	}

	findOne(id: string) {
		return this.UserModel.findById(id);
	}

	update(id: string, updateUserDto: UpdateUserDto) {
		return this.UserModel.findByIdAndUpdate(id, updateUserDto);
	}

	remove(id: string) {
		return this.UserModel.findByIdAndRemove(id);
	}
}
