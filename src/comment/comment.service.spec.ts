import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy } from 'jest-mock-extended';
import { MockContext, createMockContext } from '../prisma/context';
import { PrismaService } from '../prisma/prisma.service';
import { CommentService } from './comment.service';
import { AuthService } from '../auth/auth.service';

describe('CommentService', () => {
	let service: CommentService;
	let mockContext: MockContext;
	let prismaService: DeepMockProxy<PrismaService>;
	let authService: DeepMockProxy<AuthService>;

	beforeEach(async () => {
		jest.resetAllMocks();
		mockContext = createMockContext();

		const module: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule],
			providers: [CommentService, PrismaService, AuthService],
		})
			.overrideProvider(PrismaService)
			.useValue(mockContext.prisma)
			.overrideProvider(AuthService)
			.useValue(mockContext.authService)
			.compile();

		service = module.get<CommentService>(CommentService);
		prismaService = module.get<DeepMockProxy<PrismaService>>(PrismaService);
		authService = module.get<DeepMockProxy<AuthService>>(AuthService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
