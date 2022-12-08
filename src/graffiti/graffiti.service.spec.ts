import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGraffitiDto } from './dto/request/create-graffiti.dto';
import { GraffitiService } from './graffiti.service';

describe('GraffitiService', () => {
	let service: GraffitiService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [PrismaService, GraffitiService],
		}).compile();

		service = module.get<GraffitiService>(GraffitiService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should return successfuly create a graffiti', async () => {
		let testGraffiti: CreateGraffitiDto = {
			name: 'test',
			description: 'test',
			location: 'test',
			createdAt: new Date(),
			categoryIds: [1],
			artistIds: [1],
			authorId: 1,
		};
		let graffiti = await service.create(testGraffiti);

		console.log('created: ', graffiti);
		expect(graffiti).toBeDefined();
	});

	it('should return all graffiti', async () => {
		const graffiti = await service.findAll();

		expect(graffiti).toBeDefined();
	});
});


    // Start by collecting the photo metadata for each picture, including values such as exposure, focus, color balance, and composition.

    // Create a set of weighting factors for each metadata value, based on its importance in determining the overall quality of the picture.

    // Calculate the overall score for each picture by multiplying each metadata value by its corresponding weighting factor and summing the results.

    // Sort the pictures by their overall score in descending order, with the highest scoring picture at the top of the list.

    // Output the list of pictures ranked from best to worst.