import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy } from 'jest-mock-extended';
import { DataFactory } from '../../prisma/data/util/DataFactory';
import { MockContext, createMockContext } from '../prisma/context';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

describe('CategoryController', () => {
	let controller: CategoryController;
	let categoryService: DeepMockProxy<CategoryService>;

	let mockContext: MockContext;
	let testDataFactory: DataFactory;

	beforeEach(async () => {
		jest.resetAllMocks();
		mockContext = createMockContext();

		const module: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule],
			controllers: [CategoryController],
			providers: [CategoryService],
		})
			.overrideProvider(CategoryService)
			.useValue(mockContext.categoryService)
			.compile();

		controller = module.get<CategoryController>(CategoryController);
		categoryService =
			module.get<DeepMockProxy<CategoryService>>(CategoryService);
		testDataFactory = new DataFactory();
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should return all categories', async () => {
		let expected = [testDataFactory.getValidCategoryResponse()];
		categoryService.findAll.mockResolvedValueOnce(expected);
		const actual = await controller.findAll();

		expect(actual).toBeDefined();
		expect(actual).toEqual(expected);
	});
});
