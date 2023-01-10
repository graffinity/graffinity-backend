import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import session from 'express-session';

import * as dotenv from 'dotenv';
import 'dotenv/config';
import passport from 'passport';
import { AppModule } from './app.module';
import { CategoryModule } from './category/category.module';
import { GraffitiModule } from './graffiti/graffiti.module';

async function bootstrap() {
	const app: INestApplication = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());
	dotenv.config();

	const config = new DocumentBuilder()
		.setTitle('Graffinity')
		.setDescription('Graffinity backend')
		.setVersion('0.3.0')
		.addTag('graffiti')
		.build();

	const document = SwaggerModule.createDocument(app, config, {
		include: [GraffitiModule, CategoryModule],
	});

	SwaggerModule.setup('api', app, document);

	app.use(
		session({
			secret: 'keyboard',
			resave: false,
			saveUninitialized: false,
			cookie: { secure: true },
		}),
	);
	app.use(passport.initialize());
	app.use(passport.session());

	await app.listen(8080);
	console.log(
		`Application is running on: ${
			(await app.getUrl()) === 'http://[::1]:8080'
				? 'http://localhost:8080'
				: app.getUrl()
		}`,
	);
}
bootstrap();
