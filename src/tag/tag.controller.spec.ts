import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';

describe('TagController', () => {
	let controller: TagController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [TagController],
			providers: [TagService, PrismaService],
		}).compile();

		controller = module.get<TagController>(TagController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
