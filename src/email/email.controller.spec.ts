import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';

describe('EmailController', () => {
	let controller: EmailController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [EmailController],
			providers: [EmailService, PrismaService],
		}).compile();

		controller = module.get<EmailController>(EmailController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
