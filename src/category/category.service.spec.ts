import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy } from 'jest-mock-extended';
import { MockContext, createMockContext } from '../prisma/context';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryService } from './category.service';
import DataFactory from '../../prisma/data/util/DataFactory';
import { AuthService } from '../auth/auth.service';

describe('CategoryService', () => {
	let service: CategoryService;
	let mockContext: MockContext;
	let prismaService: DeepMockProxy<PrismaClient>;
	let authService: DeepMockProxy<AuthService>;
	let dataFactory: DataFactory;

	beforeEach(async () => {
		jest.resetAllMocks();
		mockContext = createMockContext();

		const module: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule],
			providers: [CategoryService, PrismaService, AuthService],
		})
			.overrideProvider(PrismaService)
			.useValue(mockContext.prisma)
			.overrideProvider(AuthService)
			.useValue(mockContext.authService)
			.compile();

		dataFactory = new DataFactory();
		service = module.get<CategoryService>(CategoryService);
		prismaService = module.get<DeepMockProxy<PrismaClient>>(PrismaService);
		authService = module.get<DeepMockProxy<AuthService>>(AuthService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
	it('should return all categories', async () => {
		let category = dataFactory.getValidCategoryCreateRequest();
		let response = dataFactory.getValidCategory();
		let req = dataFactory.getValidExpressRequest();

		authService.isLoggedIn.mockResolvedValueOnce(true);
		prismaService.category.create.mockResolvedValueOnce(response);

		let result = service.create(category, req);

		await expect(result).resolves.toMatchObject(response);
	});
});
