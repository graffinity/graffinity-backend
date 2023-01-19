import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy } from 'jest-mock-extended';
import { MockContext, createMockContext } from '../prisma/context';
import { PrismaService } from '../prisma/prisma.service';
import { CommentService } from './comment.service';

describe('CommentService', () => {
	let service: CommentService;
	let mockContext: MockContext;
	let prismaService: DeepMockProxy<PrismaService>;

	beforeEach(async () => {
		jest.resetAllMocks();
		mockContext = createMockContext();

		const module: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule],
			providers: [CommentService, PrismaService],
		})
			.overrideProvider(PrismaService)
			.useValue(mockContext.prisma)
			.compile();

		service = module.get<CommentService>(CommentService);
		prismaService = module.get<DeepMockProxy<PrismaService>>(PrismaService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
