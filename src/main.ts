import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import 'dotenv/config';
import session from 'cookie-session';
import passport from 'passport';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
	const app: INestApplication = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());
	dotenv.config(
		process.env.NODE_ENV === 'test' ? { path: '.env.test' } : { path: '.env' },
	);

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

	app.use(
		session({
			name: 'session',
			secret: 'keyboard',
			maxAge: 24 * 60 * 60 * 1000, // 24 hours
		}),
	);
	app.use(passport.initialize());
	app.use(passport.session());

	// Add Interceptor to map response to DTO ??
	// Add Interceptor to handle errors ??

	const prismaService = app.get(PrismaService);
	await prismaService.enableShutdownHooks(app);

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
