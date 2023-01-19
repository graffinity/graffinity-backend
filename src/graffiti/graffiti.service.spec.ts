import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Graffiti, GraffitiStatus, PrismaClient } from '@prisma/client';
import { DeepMockProxy } from 'jest-mock-extended';
import { DataFactory } from '../../prisma/data/util/DataFactory';
import { MockContext, createMockContext } from '../prisma/context';
import { PrismaService } from '../prisma/prisma.service';
import { GraffitiService } from './graffiti.service';

describe('GraffitiService', () => {
	let service: GraffitiService;
	let mockContext: MockContext;
	let prismaService: DeepMockProxy<PrismaClient>;
	let dataFactory: DataFactory = new DataFactory();

	beforeEach(async () => {
		jest.resetAllMocks();
		mockContext = createMockContext();

		const module: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule],
			providers: [GraffitiService, PrismaService],
		})
			.overrideProvider(PrismaService)
			.useValue(mockContext.prisma)
			.compile();

		service = module.get<GraffitiService>(GraffitiService);
		prismaService = module.get<DeepMockProxy<PrismaClient>>(PrismaService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
		expect(prismaService).toBeDefined();
	});
	it('should create a graffiti', async () => {
		let request = dataFactory.getValidCreateGraffitiRequest();
		let entity = dataFactory.getValidGraffiti();

		prismaService.graffiti.create.mockResolvedValueOnce(entity);
		let graffiti = await service.create(request);

		expect(graffiti).toBeDefined();
		expect(graffiti.name).toBe(request.name);
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
		prismaService.graffiti.findMany.mockResolvedValue(data);
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
