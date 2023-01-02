import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { CommentService } from './comment.service';
import { prisma } from '.prisma/client';
import { AppModule } from '../app.module';
import { INestApplication } from '@nestjs/common';

describe('CommentService', () => {
	let service: CommentService;
	let app: INestApplication;
	let prismaService: PrismaService; // CHANGE: added this line

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
			providers: [PrismaService, CommentService],
		}).compile();

		app = module.createNestApplication();
		prismaService = module.get(PrismaService); // CHANGE: created an instance of prismaService
		service = module.get<CommentService>(CommentService);

		await prismaService.$connect(); // CHANGE: added this line
		await app.init();
	});
	afterAll(() => {
		prismaService.$disconnect(); // CHANGE: added this line
		prismaService.enableShutdownHooks(app); // CHANGE: added this line
		prismaService.$on('beforeExit', async () => {
			await app.close();
		});

		app.close();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
