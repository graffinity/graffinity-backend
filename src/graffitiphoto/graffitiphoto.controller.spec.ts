import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { GraffitiPhotoController } from './graffitiphoto.controller';
import { GraffitiPhotoService } from './graffitiphoto.service';
import { S3Service } from '../s3/S3service';

describe('GraffitiPhotoController', () => {
	let controller: GraffitiPhotoController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [GraffitiPhotoController],
			providers: [S3Service, GraffitiPhotoService, PrismaService],
		}).compile();

		controller = module.get<GraffitiPhotoController>(GraffitiPhotoController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
