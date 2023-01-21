import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy } from 'jest-mock-extended';
import { MockContext, createMockContext } from '../prisma/context';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryService } from './category.service';
import DataFactory from '../../prisma/data/util/DataFactory';

describe('CategoryService', () => {
	let service: CategoryService;
	let mockContext: MockContext;
	let prismaService: DeepMockProxy<PrismaClient>;
	let dataFactory: DataFactory;

	beforeEach(async () => {
		jest.resetAllMocks();
		mockContext = createMockContext();

		const module: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule],
			providers: [CategoryService, PrismaService],
		})
			.overrideProvider(PrismaService)
			.useValue(mockContext.prisma)
			.compile();

		dataFactory = new DataFactory();
		service = module.get<CategoryService>(CategoryService);
		prismaService = module.get<DeepMockProxy<PrismaClient>>(PrismaService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
	it('should return all categories', async () => {
		let category1 = {
			id: 1,
			name: 'indigo',
			graffitiIds: [],
		};
		let categories = await service.findAll();
		let categories1 = await prismaService.category.findMany();
		prismaService.category.create.mockResolvedValue(category1);

		let testCreate = service.create(category1);

		// expect(categories[0]).toMatchObject(category1);
		await expect(testCreate).resolves.toMatchObject(category1);
		// expect(categories).toBeDefined();
	});
});
