import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { GraffitiController } from './graffiti.controller';
import { GraffitiService } from './graffiti.service';
import { GraffitiPhotoService } from '../graffitiphoto/graffitiphoto.service';
import S3Service from '../s3/S3service';
import { MetadataService } from '../metadata/metadata.service';
import { MetadataServiceJS } from '../metadata/metadata.servicejs';

describe('GraffitiController', () => {
	let controller: GraffitiController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [GraffitiController],
			providers: [
				PrismaService,
				GraffitiService,
				GraffitiPhotoService,
				S3Service,
				MetadataService,
				MetadataServiceJS,
			],
		}).compile();

		controller = module.get<GraffitiController>(GraffitiController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should return all graffiti', async () => {
		const graffiti = await controller.findAll();

		expect(graffiti).toBeDefined();
	});
});
