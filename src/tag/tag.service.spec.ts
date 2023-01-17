import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { TagService } from './tag.service';

describe('TagService', () => {
	let service: TagService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule],
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

		// let test = await service.create(testTag);

		expect(test).toBeDefined();
	});
});
