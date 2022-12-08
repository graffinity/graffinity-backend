import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { S3Service } from './S3service';

describe('GraffitiphotoService', () => {
	let service: S3Service;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [S3Service, PrismaService],
		}).compile();

		service = module.get<S3Service>(S3Service);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
