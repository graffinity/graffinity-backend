import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import S3service, { S3Service } from '../s3/S3service';
import { GraffitiPhotoService } from './graffitiphoto.service';

describe('GraffitiphotoService', () => {
	let service: GraffitiPhotoService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [S3service, GraffitiPhotoService, PrismaService],
		}).compile();

		service = module.get<GraffitiPhotoService>(GraffitiPhotoService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
