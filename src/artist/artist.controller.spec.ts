import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { AuthModule } from '../auth/auth.module';

describe('ArtistController', () => {
	let controller: ArtistController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule, AuthModule],
			controllers: [ArtistController],
			providers: [PrismaService, ArtistService],
		}).compile();

		controller = module.get<ArtistController>(ArtistController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
