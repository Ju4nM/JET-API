import { PartialType } from "@nestjs/mapped-types";
import { IsOptional, Length } from "class-validator";
import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) {
	@IsOptional()
	@Length(8, 60, {
		message: "La contraseña debe estar entre 8 y 60 caracteres",
	})
	password: string;
}
