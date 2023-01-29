import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth/auth.service';
import { MetadataService } from '../metadata/metadata.service';
import { PrismaService } from '../prisma/prisma.service';
import { S3Service } from '../s3/S3service';
import { UserService } from '../user/user.service';
import { GraffitiPhotoController } from './graffitiphoto.controller';
import { GraffitiPhotoService } from './graffitiphoto.service';

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
