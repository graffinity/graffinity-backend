import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import {
	Graffiti,
	GraffitiPhoto,
	GraffitiStatus,
	PrismaClient,
} from '@prisma/client';
import { DeepMockProxy } from 'jest-mock-extended';
import { DataFactory } from '../../prisma/data/util/DataFactory';
import { MockContext, createMockContext } from '../prisma/context';
import { PrismaService } from '../prisma/prisma.service';
import { GraffitiService } from './graffiti.service';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { Request } from 'express';
import { GraffitiPhotoService } from '../graffitiphoto/graffitiphoto.service';
import S3Service from '../s3/S3service';
import { MetadataService } from '../metadata/metadata.service';
import { GraffitiEntity } from './entities/graffiti.entity';

describe('GraffitiService', () => {
	let service: GraffitiService;
	let mockContext: MockContext;
	let prismaService: DeepMockProxy<PrismaClient>;
	let authService: DeepMockProxy<AuthService>;
	let dataFactory: DataFactory = new DataFactory();

	beforeEach(async () => {
		jest.resetAllMocks();
		mockContext = createMockContext();

		const module: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule],
			providers: [
				GraffitiService,
				PrismaService,
				AuthService,
				JwtService,
				UserService,
				GraffitiPhotoService,
				MetadataService,
				S3Service,
			],
		})
			.overrideProvider(PrismaService)
			.useValue(mockContext.prisma)
			.overrideProvider(AuthService)
			.useValue(mockContext.authService)
			.compile();

		service = module.get<GraffitiService>(GraffitiService);
		prismaService = module.get<DeepMockProxy<PrismaClient>>(PrismaService);
		authService = module.get<DeepMockProxy<AuthService>>(AuthService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
		expect(prismaService).toBeDefined();
	});
	it('should create a graffiti', async () => {
		let request = dataFactory.getValidCreateGraffitiRequest();
		let entity = dataFactory.getValidGraffiti();
		let req = dataFactory.getValidExpressRequest();

		authService.isLoggedIn.mockResolvedValueOnce(true);
		prismaService.graffiti.create.mockResolvedValueOnce(entity);

		let graffiti = await service.create(request, req);

		expect(graffiti).toBeDefined();
		expect(graffiti.name).toBe(request.name);
	});

	it('should return all graffiti', async () => {
		let data: (Graffiti & {
			photos: GraffitiPhoto[];
		})[] = [
			{
				id: 1,
				name: 'test',
				description: 'test',
				longitude: 'test',
				latitude: 'test',
				status: GraffitiStatus.PENDING,
				address: 'test',
				authorId: 1,
				createdAt: new Date(),
				photos: [],
			},
		];
		prismaService.graffiti.findMany.mockResolvedValue(data);
		const response = await service.findAll();

		expect(response).toBeDefined();
		expect(response).toStrictEqual(data);
	});
});

// Start by collecting the photo metadata for each picture, including values such as exposure, focus, color balance, and composition.

// Create a set of weighting factors for each metadata value, based on its importance in determining the overall quality of the picture.

// Calculate the overall score for each picture by multiplying each metadata value by its corresponding weighting factor and summing the results.

// Sort the pictures by their overall score in descending order, with the highest scoring picture at the top of the list.

// Output the list of pictures ranked from best to worst.
