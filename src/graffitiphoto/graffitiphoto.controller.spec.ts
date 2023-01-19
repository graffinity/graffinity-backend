import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { S3Service } from '../s3/S3service';
import { GraffitiPhotoController } from './graffitiphoto.controller';
import { GraffitiPhotoService } from './graffitiphoto.service';
import { MetadataService } from '../metadata/metadata.service';
import { MetadataServiceJS } from '../metadata/metadata.servicejs';
import { ConfigModule } from '@nestjs/config';

describe('GraffitiPhotoController', () => {
	let controller: GraffitiPhotoController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule],
			controllers: [GraffitiPhotoController],
			providers: [
				S3Service,
				GraffitiPhotoService,
				PrismaService,
				MetadataService,
				MetadataServiceJS,
			],
		}).compile();

		controller = module.get<GraffitiPhotoController>(GraffitiPhotoController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
