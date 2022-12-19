import { Test, TestingModule } from '@nestjs/testing';
import { Artist } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ArtistService } from './artist.service';

describe('ArtistService', () => {
	let service: ArtistService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [PrismaService, ArtistService],
		}).compile();

		service = module.get<ArtistService>(ArtistService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	let artist1: Artist = {
		id: 1,
		name: 'Courtney',
		surname: 'Tyler',
		// graffitis: [],
	};
	it('should return all categories', async () => {
		const artists = await service.findAll();

		console.log('expected', artist1);
		console.log('actual', artists[0]);

		expect(artists[0]).toMatchObject(artist1);
		expect(artists).toBeDefined();
	});
});

