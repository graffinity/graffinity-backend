import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { DataFactory } from '../../prisma/data/util/DataFactory';
import { CategoryService } from '../category/category.service';
import { GraffitiService } from '../graffiti/graffiti.service';
import { PrismaService } from './prisma.service';
import { ReportService } from '../report/report.service';

export type Context = {
	dataFactory: DataFactory;
	prisma: PrismaService;
	appService: GraffitiService;
	graffitiService: GraffitiService;
	categoryService: CategoryService;
	reportService: ReportService;
	// Add more services here
};

export type MockContext = {
	dataFactory: DataFactory;
	prisma: DeepMockProxy<PrismaClient>;
	appService: DeepMockProxy<GraffitiService>;
	graffitiService: DeepMockProxy<GraffitiService>;
	categoryService: DeepMockProxy<CategoryService>;
	reportService: DeepMockProxy<ReportService>;
	// Add more services here
};

export const createMockContext = (): MockContext => {
	return {
		dataFactory: DataFactory.getInstance(),
		prisma: mockDeep<PrismaClient>(),
		appService: mockDeep<GraffitiService>(),
		graffitiService: mockDeep<GraffitiService>(),
		categoryService: mockDeep<CategoryService>(),
		reportService: mockDeep<ReportService>(),
		// Add more services here
	};
};
