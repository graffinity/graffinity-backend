import { Test, TestingModule } from '@nestjs/testing';
import { EmailTemplateController } from './email-template.controller';
import { EmailTemplateService } from './email-template.service';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';

describe('EmailTemplateController', () => {
	let controller: EmailTemplateController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule],
			controllers: [EmailTemplateController],
			providers: [EmailTemplateService, PrismaService],
		}).compile();

		controller = module.get<EmailTemplateController>(EmailTemplateController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
