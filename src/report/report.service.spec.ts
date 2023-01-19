import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { ReportService } from './report.service';
import { MockContext, createMockContext } from '../prisma/context';
import { DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient } from '.prisma/client';

describe('ReportService', () => {
	let service: ReportService;
	let mockContext: MockContext;
	let prismaService: DeepMockProxy<PrismaClient>;

	beforeEach(async () => {
		jest.resetAllMocks();
		mockContext = createMockContext();

		const module: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule],
			providers: [ReportService, PrismaService],
		})
			.overrideProvider(PrismaService)
			.useValue(mockContext.prisma)
			.compile();

		service = module.get<ReportService>(ReportService);
		prismaService = module.get<DeepMockProxy<PrismaClient>>(PrismaService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	// let report1 = {
	// 	id: 1,
	// 	userId: 1,
	// 	graffitiId: 1,
	// 	description: 'This is a test report',
	// 	createdAt: new Date(),
	// 	updatedAt: new Date(),
	// };

	it('should return all reports', async () => {
		prismaService.report.findMany.mockResolvedValue([]);
		const reports = await service.findAll();

		expect(reports).toEqual([]);
	});
});
