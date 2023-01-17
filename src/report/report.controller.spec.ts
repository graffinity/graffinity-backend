import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy } from 'jest-mock-extended';
import { MockContext, createMockContext } from '../prisma/context';
import { PrismaService } from '../prisma/prisma.service';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

describe('ReportController', () => {
	let controller: ReportController;
	let mockContext: MockContext;
	let prismaService: DeepMockProxy<PrismaService>;
	let reportService: DeepMockProxy<ReportService>;

	beforeEach(async () => {
		jest.resetAllMocks();
		mockContext = createMockContext();

		const module: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule],
			controllers: [ReportController],
			providers: [ReportService, PrismaService],
		})
			.overrideProvider(PrismaService)
			.useValue(mockContext.prisma)
			.overrideProvider(ReportService)
			.useValue(mockContext.reportService)
			.compile();

		controller = module.get<ReportController>(ReportController);
		prismaService = module.get<DeepMockProxy<PrismaService>>(PrismaService);
		reportService = module.get<DeepMockProxy<ReportService>>(ReportService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should return all reports', async () => {
		reportService.findAll.mockResolvedValue([]);
		const reports = await controller.findAll();

		expect(reports).toEqual([]);
	});
});
