import { APP_PIPE, NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import passport from "passport";
import { AppModule } from "./app.module";
import { CategoryModule } from "./category/category.module";
import { GraffitiModule } from "./graffiti/graffiti.module";
import session from "express-session";
async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.setTitle('Graffinity')
		.setDescription('Graffinity API documentation')
		.setVersion('0.0.1')
		.addTag('graffiti')
		.build();

	const document = SwaggerModule.createDocument(app, config, {
		include: [GraffitiModule, CategoryModule],
	});

	SwaggerModule.setup("api", app, document);

	app.use(
		session({
			secret: "keyboard",
			resave: false,
			saveUninitialized: false,
		}),
	);
	app.use(passport.initialize());
	app.use(passport.session());

	await app.listen(8080);
	console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
