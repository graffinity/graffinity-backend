import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy } from 'jest-mock-extended';
import { DataFactory } from '../../prisma/data/util/DataFactory';
import { MockContext, createMockContext } from '../prisma/context';
import { PrismaService } from '../prisma/prisma.service';
import { GraffitiController } from './graffiti.controller';
import { GraffitiModule } from './graffiti.module';
import { GraffitiService } from './graffiti.service';
import GraffitiMapper from './mapper/GraffitiMapper';

describe('GraffitiController', () => {
	let dataFactory: DataFactory = new DataFactory();
	let controller: GraffitiController;
	let mockContext: MockContext;
	let graffitiService: DeepMockProxy<GraffitiService>;
	beforeEach(async () => {
		jest.resetAllMocks();
		mockContext = createMockContext();

		const module: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule, GraffitiModule],
			controllers: [GraffitiController],
			providers: [GraffitiService, PrismaService],
		})
			.overrideProvider(GraffitiService)
			.useValue(mockContext.graffitiService)
			.compile();

		controller = module.get<GraffitiController>(GraffitiController);
		graffitiService =
			module.get<DeepMockProxy<GraffitiService>>(GraffitiService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should return all graffiti', async () => {
		let expected1 = [dataFactory.getValidGraffitiWithPhotos()];
		graffitiService.findAll.mockResolvedValueOnce(expected1);
		let expected = GraffitiMapper.toResponses(expected1);

		const actual = await controller.findAll();

		console.log('actual: ', actual);
		console.log('expected: ', expected);

		expect(actual).toBeDefined();
		expect(actual).toEqual(expected);
	});
});
