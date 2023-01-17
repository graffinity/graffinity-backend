import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Graffiti, GraffitiStatus, PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGraffitiDto } from './dto/request/create-graffiti.dto';
import { GraffitiService } from './graffiti.service';
import { GraffitiResponseDto } from './dto/response/graffiti-response.dto';

describe('GraffitiService', () => {
	let service: GraffitiService;
	let prismaService: DeepMockProxy<PrismaClient>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule, PrismaModule],
			providers: [GraffitiService, ConfigService, PrismaService],
		})
			.overrideProvider(PrismaService)
			.useValue(mockDeep<PrismaClient>())
			.compile();

		service = module.get<GraffitiService>(GraffitiService);
		prismaService = module.get(PrismaService);
	});

	beforeEach(() => {
		mockReset(prismaService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
		expect(prismaService).toBeDefined();
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
			name: 'test123',
			description: 'test',
			longitude: 'test',
			latitude: 'test',
			createdAt: new Date(),
			authorId: 1,
			categoryIds: [],
			artistIds: [1],
		};

		let graffiti = await service.create(testGraffiti);
		console.log('created: ', graffiti);
		prismaService.graffiti.create.mockResolvedValueOnce(graffiti);
		let graffiti2 = await prismaService.graffiti.create({
			data: testGraffiti,
		});

		console.log('created2: ', graffiti2);
		// let graffiti1 = await service.create(testGraffiti);
		// console.log('created: ', graffiti1);
		// let graffiti2 = await service.create(testGraffiti);
		// console.log('created: ', graffiti2);
	});

	it('should return all graffiti', async () => {
		let data: Graffiti[] = [
			{
				id: 1,
				name: 'test',
				description: 'test',
				longitude: 'test',
				latitude: 'test',
				status: GraffitiStatus.PENDING,
				authorId: 1,
				createdAt: new Date(),
			},
		];
		prismaService.graffiti.findMany.mockResolvedValueOnce(data);
		const response = await service.findAll();

		expect(response).toBeDefined();
		expect(response).toBe(data);
	});
});

// Start by collecting the photo metadata for each picture, including values such as exposure, focus, color balance, and composition.

// Create a set of weighting factors for each metadata value, based on its importance in determining the overall quality of the picture.

// Calculate the overall score for each picture by multiplying each metadata value by its corresponding weighting factor and summing the results.

// Sort the pictures by their overall score in descending order, with the highest scoring picture at the top of the list.

// Output the list of pictures ranked from best to worst.
