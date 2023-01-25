import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { S3Service } from '../s3/S3service';
import { GraffitiPhotoController } from './graffitiphoto.controller';
import { GraffitiPhotoService } from './graffitiphoto.service';
import { MetadataService } from '../metadata/metadata.service';
import { MetadataServiceJS } from '../metadata/metadata.servicejs';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

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
				AuthService,
				UserService,
				JwtService,
			],
		}).compile();

		controller = module.get<GraffitiPhotoController>(GraffitiPhotoController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
