import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy } from 'jest-mock-extended';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MockContext, createMockContext } from './prisma/context';
import { PrismaService } from './prisma/prisma.service';

describe('AppController', () => {
	let appController: AppController;
	let appService: DeepMockProxy<AppService>;
	let mockContext: MockContext;

	beforeEach(async () => {
		jest.resetAllMocks();
		mockContext = createMockContext();

		const moduleRef: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule],
			controllers: [AppController],
			providers: [AppService, PrismaService],
		})
			.overrideProvider(AppService)
			.useValue(mockContext.appService)
			.overrideProvider(PrismaService)
			.useValue(mockContext.prisma)
			.compile();

		appService = moduleRef.get<DeepMockProxy<AppService>>(AppService);
		appController = moduleRef.get<AppController>(AppController);
	});

	describe('root', () => {
		it('should return "Hello World!"', () => {
			appService.getHello.mockReturnValue('Hello World!');
			expect(appController.getHello()).toBe('Hello World!');
			expect(appService.getHello).toHaveBeenCalled();
		});
	});
});
