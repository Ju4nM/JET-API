import {
	Controller,
	Get,
	Post,
	Body,
	Put,
	Param,
	Delete,
	Req,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Request } from "express";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	async create(@Body() createUserDto: CreateUserDto) {
		return await this.usersService.create(createUserDto);
	}

	@Get()
	async findAll(@Req() request: Request) {
		return await this.usersService.findAll();
	}

	@Get(":userName")
	async findOne(@Param("userName") userName: string) {
		return await this.usersService.findByUserName(userName);
	}

	@Put(":id")
	async update(
		@Param("id") id: string,
		@Body() updateUserDto: UpdateUserDto,
	) {
		return await this.usersService.update(id, updateUserDto);
	}

	@Delete(":id")
	async remove(@Param("id") id: string) {
		return await this.usersService.remove(id);
	}
}
