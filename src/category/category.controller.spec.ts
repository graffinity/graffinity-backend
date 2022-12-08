import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

describe('CategoryController', () => {
	let controller: CategoryController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [CategoryController],
			providers: [CategoryService, PrismaService],
		}).compile();

		controller = module.get<CategoryController>(CategoryController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should return all categories', async () => {
		const categories = await controller.findAll();

		expect(categories).toBeDefined();
	});
		
});
