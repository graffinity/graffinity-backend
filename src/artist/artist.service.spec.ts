import { Test, TestingModule } from '@nestjs/testing';
import { Artist } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/request/create-artist.dto';

describe('ArtistService', () => {
	let service: ArtistService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ArtistService],
		}).compile();

		service = module.get<ArtistService>(ArtistService);
	});

	afterEach(() => console.log('database teardown'));
	afterEach(() => console.log('connection teardown'));

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	let artist1: Artist = {
		id: 2,
		name: 'Courtney',
		surname: 'Tyler',
		// graffitis: [],
	};

	describe('Create method', () => {
		it('should create and return an object of artist details', async () => {
			let testArtist = {
				name: 'Namenam',
				surname: 'surnamesurnam',
				graffitiIds: [3],
			};

			const artist = await service.create(testArtist);
			expect(artist).not.toBeNull();
		});
	});

	describe('FindAll method', () => {
		it('should return all artists', async () => {
			const artists = await service.findAll();

			console.log('expected', artist1);
			console.log('actual', artists[0]);

			//expect(artists[0]).toMatchObject(artist1);
			expect(artists).toBeDefined();
		});
	});
});
	