import {
	Controller,
	Post,
	Body,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto"

@Controller("auth")
export class AuthController {
	
	constructor(private readonly authService: AuthService) {}

	@Post()
	async auth(@Body() authDto: AuthDto) {
		let payload = await this.authService.auth(authDto);
		return payload;
	}

}
