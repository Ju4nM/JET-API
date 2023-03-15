import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";
import { AppModule } from "./app.module";
import * as cors from "cors";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	// app.enableCors();
	app.use(cors({
		origin: "http://jetapptest.somee.com/",
		credentials: true
	}));
	app.use(cookieParser());
	app.useGlobalPipes(new ValidationPipe());
	await app.listen(3000);
}
bootstrap();
