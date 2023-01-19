import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { EmailTemplateService } from './email-template.service';
import { ConfigModule } from '@nestjs/config';

describe('EmailTemplateService', () => {
	let service: EmailTemplateService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule],
			providers: [EmailTemplateService, PrismaService],
		}).compile();

		service = module.get<EmailTemplateService>(EmailTemplateService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
