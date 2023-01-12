import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { mockDeep } from 'jest-mock-extended';
import { Context, MockContext, createMockContext } from '../prisma/context';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGraffitiDto } from './dto/request/create-graffiti.dto';
import { GraffitiService } from './graffiti.service';

describe('GraffitiService', () => {
	let service: GraffitiService;
	let mockContext: MockContext;
	let context: Context;
	let prisma: PrismaClient;

	beforeEach(async () => {
		mockContext = createMockContext();
		context = mockContext as unknown as Context;

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: GraffitiService,
					useValue: {
						create: jest.fn().mockImplementation((dto: CreateGraffitiDto) => {
							return {
								id: 1,
								name: dto.name,
								description: dto.description,
								location: dto.location,
								createdAt: dto.createdAt,
								authorId: dto.authorId,
							};
						}),
						findAll: jest.fn().mockImplementation(() => {
							return [
								{
									id: 1,
									name: 'test',
									description: 'test',
									location: 'test',
									createdAt: new Date(),
									authorId: 1,
								},
							];
						}),
					},
				},
			],
		})
			.overrideProvider(PrismaService)
			.useValue(mockDeep<PrismaClient>())
			.compile();

		service = module.get<GraffitiService>(GraffitiService);
		// prisma = module.get<PrismaService>(PrismaService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	// it('should return successfuly create a graffiti', async () => {
	// 	let testGraffiti: CreateGraffitiDto = {
	// 		name: 'test',
	// 		description: 'test',
	// 		location: 'test',
	// 		createdAt: new Date(),
	// 		categoryIds: [1],
	// 		artistIds: [1],
	// 		authorId: 1,
	// 	};
	// 	let graffiti = await service.create(testGraffiti);

	// 	console.log('created: ', graffiti);
	// 	expect(graffiti).toBeDefined();
	// });
	it('should create a graffiti', async () => {
		let testGraffiti: CreateGraffitiDto = {
			name: 'test',
			description: 'test',
			location: 'test',
			createdAt: new Date(),
			authorId: 1,
			categoryIds: [],
			artistIds: [1],
		};

		let graffiti = await service.create(testGraffiti);
		let graffiti1 = await service.create(testGraffiti);
		let graffiti2 = await service.create(testGraffiti);
	});

	it('should return all graffiti', async () => {
		let graffitis = await context.prisma.graffiti.findMany();

		const graffiti = await service.findAll();

		console.log('graffitis from context: ', graffitis);
		console.log('graffitis real?: ', graffiti);
	});
});

// Start by collecting the photo metadata for each picture, including values such as exposure, focus, color balance, and composition.

// Create a set of weighting factors for each metadata value, based on its importance in determining the overall quality of the picture.

// Calculate the overall score for each picture by multiplying each metadata value by its corresponding weighting factor and summing the results.

// Sort the pictures by their overall score in descending order, with the highest scoring picture at the top of the list.

// Output the list of pictures ranked from best to worst.
