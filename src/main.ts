import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors({
		// origin: ["http://localhost:4200", "jetapptest.somee.com", "jetclimatizationapp.somee.com"],
		// origin: "http://localhost:4200",
		origin: "http://jetapptest.somee.com",
		credentials: true
	});
	app.use(cookieParser());
	app.useGlobalPipes(new ValidationPipe());
	await app.listen(3000);
}
bootstrap();
