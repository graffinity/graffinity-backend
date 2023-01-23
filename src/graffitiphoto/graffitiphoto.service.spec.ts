import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import S3service from '../s3/S3service';
import { GraffitiPhotoService } from './graffitiphoto.service';
import { MetadataServiceJS } from '../metadata/metadata.servicejs';
import { MetadataService } from '../metadata/metadata.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

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
				MetadataService,
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
