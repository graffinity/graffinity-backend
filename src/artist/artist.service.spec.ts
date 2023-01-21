import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { ArtistService } from './artist.service';

describe('ArtistService', () => {
	let service: ArtistService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule],
			providers: [PrismaService, ArtistService],
		}).compile();

		service = module.get<ArtistService>(ArtistService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
