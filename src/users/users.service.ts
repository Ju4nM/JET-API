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
		let { userName, email, password } = createUserDto;

		// let userNameExist = await this.UserModel.find({userName});
		// let emailExist = await this.UserModel.find({email});
		
		// if (userNameExist.length > 0) {
		// 	return new HttpException("El nombre de usuario ya existe, favor de usar otro", HttpStatus.CONFLICT);
		// 	// return new ConflictException("Credenciales duplicadas", {cause: new Error(), description: "El usuario ya esta en uso, favor de elegir otro"})
		// }
		// throw new HttpException({message: ["El nombre de usuario ya existe, favor de usar otro"]}, HttpStatus.CONFLICT);

		// if (emailExist.length > 0) {
		// 	return new HttpException(["El correo ya existe, favor de usar otro"], HttpStatus.CONFLICT);
		// 	// return new ConflictException("Credenciales duplicadas", {cause: new Error(), description: "El correo ya esta en uso, favor de elegir otro"})
		// }
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
			
			if (!error.code) {
				throw new HttpException({message: ["Error de servidor"]}, HttpStatus.INTERNAL_SERVER_ERROR);
			}

			if (error.keyPattern.userName === 1) {
				throw new HttpException({message: ["El usuario y esta en uso, favor de usar otro"]}, HttpStatus.CONFLICT);
			}

			if (error.keyPattern.email == 1) {
				throw new HttpException({message: ["El email y esta en uso, favor de usar otro"]}, HttpStatus.CONFLICT);
			}
		}

	}

	async findAll() {
		return await this.UserModel.find({}, { password: 0 });
	}

	async findOne(id: string) {
		return await this.UserModel.findById(id, { password: 0 });
	}

	async update(id: string, updateUserDto: UpdateUserDto) {
		return await this.UserModel.findByIdAndUpdate(id, updateUserDto, {
			password: 0,
		});
	}

	async remove(id: string) {
		return await this.UserModel.findByIdAndRemove(id, { password: 0 });
	}

}