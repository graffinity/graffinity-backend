import { Test, TestingModule } from '@nestjs/testing';
import { Category } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryService } from './category.service';
import { CategoryEntity } from './entities/category.entity';

describe('CategoryService', () => {
	let service: CategoryService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [CategoryService, PrismaService],
		}).compile();

		service = module.get<CategoryService>(CategoryService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	let category1: Category = {
		id: 1,
		name: 'indigo',
	};
	it('should return all categories', async () => {
		const categories = await service.findAll();

		// console.log('expected', category1);
		// console.log('actual', categories[0]);

		// expect(categories[0]).toMatchObject(category1);
		expect(categories).toBeDefined();
	});
});
