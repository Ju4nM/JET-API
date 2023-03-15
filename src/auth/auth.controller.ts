import {
	Controller,
	Post,
	Body,
	Res,
	UseGuards,
	Get,
	Req,
	Header,
} from "@nestjs/common";
import {hash} from "bcrypt";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto"
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@Controller("auth")
export class AuthController {
	
	constructor(private readonly authService: AuthService) {}

	@UseGuards(JwtAuthGuard)
	@Post()
	async auth(@Body() authDto: AuthDto, @Res() res: Response, @Req() req: Request) {
		let {auth_token} = await this.authService.auth(authDto);
		return res.cookie("auth_token", auth_token).send()
	}


	@Post("login")
	async login (@Body() authDto: AuthDto, @Res() res: Response ) {
		let payload = await this.authService.auth(authDto);
		return res.cookie("auth_token", payload.auth_token, {
			httpOnly: true,
			secure: false,
			sameSite: "none"
		}).json(payload);
	}

}
