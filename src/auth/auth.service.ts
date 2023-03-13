import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AuthDto } from "./dto/auth.dto";
import { compare } from "bcrypt";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {

	constructor (
		private userService: UsersService,
		private jwtService: JwtService
	) {}

	async auth(authData: AuthDto) {
		let payload = await this.validateUser(authData);
		let { id } = payload;
		
		return {
			id: payload.id,
			userName: payload.userName,
			userType: payload.userType,
			auth_token: this.jwtService.sign(payload)
		};
	}

	async validateUser (authData: AuthDto) {
		let { userName, password } = authData;
		let user = await this.userService.findByUserName(userName, {});
		if (!user) throw new HttpException({message: ["Usuario y / contraseña incorrectas"]}, HttpStatus.FORBIDDEN);
		
		let passwordHashed = user.password;
		let areEquals: boolean = await compare(password, passwordHashed);

		if (!areEquals) throw new HttpException({message: ["Usuario y / contraseña incorrectas"]}, HttpStatus.FORBIDDEN);
		let payload = {
			id: user._id,
			userName: user.userName,
			userType: user.userType
		};

		return payload;
	}

	async logout () {

	}
}
