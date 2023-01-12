import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { ReportService } from './report.service';

describe('ReportService', () => {
	let service: ReportService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [PrismaService, ReportService],
		}).compile();

		service = module.get<ReportService>(ReportService);
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
		const reports = await service.findAll();

		expect(reports).toEqual([]);
	});
});
