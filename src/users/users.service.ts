import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserDocument } from "./schemas/user.schema";
import { hash } from "bcrypt";

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name) private UserModel: Model<UserDocument>,
	) {}

	async create(createUserDto: CreateUserDto) {
		let { password } = createUserDto;

		let passwordHashed = await hash(password, 8);
		let newUser = new this.UserModel({
			...createUserDto,
			password: passwordHashed,
		});
		try {
			let userCreated = await newUser.save();
			delete userCreated.password;
			return userCreated;
		} catch (error) {
			console.log(error);
			if (!error.code)
				throw new HttpException({message: ["Error de servidor"]}, HttpStatus.INTERNAL_SERVER_ERROR);

			if (error.keyPattern.userName === 1)
				throw new HttpException({message: ["El usuario y esta en uso, favor de usar otro"]}, HttpStatus.CONFLICT);

			if (error.keyPattern.email == 1)
				throw new HttpException({message: ["El email y esta en uso, favor de usar otro"]}, HttpStatus.CONFLICT);
			
		}

	}

	async findAll() {
		return await this.UserModel.find({userType: false}, { password: 0 });
	}

	async findOne(id: string) {
		return await this.UserModel.findById({_id: id, userType: false}, { password: 0 });
	}

	async findByUserName (userName: string, options: {} = {password: 0}) {
		return await this.UserModel.findOne({userName}, options);
	}

	async update(id: string, updateUserDto: UpdateUserDto) {
		return await this.UserModel.findByIdAndUpdate({_id: id, userType: false}, updateUserDto, {
			password: 0,
		});
	}

	async remove(id: string) {
		return await this.UserModel.findByIdAndRemove({_id: id, userType: false}, { password: 0 });
	}

}