import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { TagService } from './tag.service';
import { TestDataFactory } from '../prisma/data/util/TestDataFactory';

describe('TagService', () => {
	let service: TagService;
	let dataFactory: TestDataFactory;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [TagService, PrismaService],
		}).compile();

		service = module.get<TagService>(TagService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should return successfuly create a tag', async () => {
		let testTag = {
			name: 'test',
			description: 'test',
		};
		let expected = 'test';

		let test = await service.create(testTag);

		expect(test).toBeDefined();
	});
});
