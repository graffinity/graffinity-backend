import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { AuthService } from '../auth/auth.service';
import { MetadataServiceJS } from '../metadata/metadata.servicejs';
import { PrismaService } from '../prisma/prisma.service';
import S3service from '../s3/S3service';
import { UserService } from '../user/user.service';
import { GraffitiPhotoService } from './graffitiphoto.service';

describe('GraffitiphotoService', () => {
	let service: GraffitiPhotoService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule, PrismaClient],
			providers: [
				S3service,
				GraffitiPhotoService,
				PrismaService,
				MetadataServiceJS,
				AuthService,
				UserService,
				JwtService,
			],
		}).compile();

		service = module.get<GraffitiPhotoService>(GraffitiPhotoService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
