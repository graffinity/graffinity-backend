import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import S3service from '../s3/S3service';
import { GraffitiPhotoService } from './graffitiphoto.service';
import { MetadataServiceJS } from '../metadata/metadata.servicejs';
import { MetadataService } from '../metadata/metadata.service';

describe('GraffitiphotoService', () => {
	let service: GraffitiPhotoService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				S3service,
				GraffitiPhotoService,
				PrismaService,
				MetadataServiceJS,
				MetadataService,
			],
		}).compile();

		service = module.get<GraffitiPhotoService>(GraffitiPhotoService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
