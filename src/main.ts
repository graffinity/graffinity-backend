import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import 'dotenv/config';
// import session from 'cookie-session';
import session from 'express-session';
import passport from 'passport';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
	const app: INestApplication = await NestFactory.create(AppModule);

	// app.enableCors(); // Enable CORS for all routes

	// app.enableCors({
	// 	origin: [
	// 		'http://localhost:3000',
	// 		'http://graffinity.art',
	// 		'https://graffinity.art',
	// 		'https://graffinity-images.s3.eu-central-1.amazonaws.com',
	// 		'https://google.com',
	// 		'https://developers.google.com/',
	// 	],
	// 	credentials: true,
	// 	exposedHeaders: [
	// 		'Set-Cookie',
	// 		'Access-Control-Allow-Origin',
	// 		'Access-Control-Allow-Headers',
	// 	],
	// 	allowedHeaders: [
	// 		'Content-Type',
	// 		'Authorization',
	// 		'Access-Control-Allow-Origin',
	// 		'Access-Control-Allow-Headers',
	// 		'Access-Control-Allow-Methods',
	// 		'Access-Control-Allow-Credentials',
	// 	],

	// 	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	// });

	app.useGlobalPipes(new ValidationPipe());
	dotenv.config({ path: '.env' });

	const config = new DocumentBuilder()
		.setTitle('Graffinity')
		.setDescription('Graffinity backend')
		.setVersion('1.0.0')
		.addTag('graffiti')
		.build();

	const document = SwaggerModule.createDocument(app, config, {
		include: [AppModule],
	});

	SwaggerModule.setup('api', app, document);

	// ### Cookie session
	// app.use(
	// 	session({
	// 		name: 'session',
	// 		secret: 'keyboard',
	// 		maxAge: 24 * 60 * 60 * 1000, // 24 hours
	// 		sameSite: 'none',
	// 	}),
	// );
	// ###

	// ### Express session
	app.use(
		session({
			secret: 'keyboard cat',
			resave: false,
			saveUninitialized: false,
			cookie: {
				secure: true,
				sameSite: 'none',
				maxAge: 24 * 60 * 60 * 1000, // 24 hours
			},
		}),
	);
	// ###

	app.use(passport.initialize());
	app.use(passport.session());

	// Add Interceptor to map response to DTO ??
	// Add Interceptor to handle errors ??

	const prismaService = app.get(PrismaService);
	await prismaService.enableShutdownHooks(app);

	await app.listen(8080);

	console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
