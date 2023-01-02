import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Artist } from '@prisma/client';
import { Service } from 'aws-sdk';
import { after } from 'node:test';
import { AppModule } from '../app.module';
import { PrismaService } from '../prisma/prisma.service';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/request/create-artist.dto';

describe('ArtistService', () => {
	let service: ArtistService;
	let app: INestApplication;
	let prismaService: PrismaService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			// imports: [AppModule],
			providers: [ArtistService, PrismaService],
		}).compile();

		// app = module.createNestApplication();
		// prismaService = module.get(PrismaService);
		service = module.get<ArtistService>(ArtistService);
	});

	// afterAll(async () => {
	// 	prismaService.$disconnect();
	// 	app.close();
	// });

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	let artist1: Artist = {
		id: 2,
		name: 'Courtney',
		surname: 'Tyler',
		// graffitis: [],
	};

	let testArtist = {
		name: 'Namenam',
		surname: 'surnamesurnam',
		graffitiIds: [],
	};

	let artistResult: Artist;

	describe('Create method', () => {
		it('should create and return an object of artist details', async () => {
			const artist = await service.create(testArtist);
			artistResult = artist;
			expect(artist).not.toBeNull();
			const artist2 = await service.delete(artistResult.id);
		});

		// it('should delelte artist', async () => {

		//});
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

	describe('FindOne method', () => {
		it('Should return one artist', async () => {
			const artist = await service.create(testArtist);
			artistResult = artist;
			expect(artist).not.toBeNull();
			const artist3 = await service.findOne(artistResult.id);
			const artist2 = await service.delete(artistResult.id);

			console.log('expected: ', artist3);
			console.log('actual: ', artist);
			expect(artist3).toBeDefined();
		});
	});
});
