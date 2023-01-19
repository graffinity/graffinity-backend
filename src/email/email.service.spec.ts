import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';

describe('EmailService', () => {
	let service: EmailService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule],
			providers: [EmailService, PrismaService],
		}).compile();

		service = module.get<EmailService>(EmailService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
