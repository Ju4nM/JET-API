import {
	IsEmail,
	IsOptional,
	IsString,
	Length,
	MaxLength,
	MinLength,
} from "class-validator";

export class CreateUserDto {
	// @IsString()
	// @MaxLength(15)
	@Length(3, 25, {
		message: "El nombre debe ser mayor a 3 digitos pero menor que 15",
	})
	names: string;

	// @IsString()
	// @MaxLength(15)
	@Length(3, 15, {
		message:
			"El apellido paterno debe ser mayor a 3 digitos pero menor que 15",
	})
	firstLastName: string;

	// @IsString()
	// @MaxLength(15)
	@Length(3, 15, {
		message: "El apellido materno debe ser mayor a 3 digitos pero menor que 15",
	})
	secondLastName: string;

	// @IsString()
	// @MaxLength(15)
	@Length(5, 40, {
		message: "El usuario debe ser mayor a 5 digitos pero menor que 40",
	})
	userName: string;

	// @IsString()
	@IsEmail({}, { message: "El correo es invalido" })
	// @IsOptional()
	email: string;

	// @IsString()
	// @MinLength(8)
	// @MaxLength(60)
	@Length(8, 60, {
		message: "La contraseña debe estar entre 8 y 60 caracteres",
	})
	password: string;
}
