import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from '../auth/auth.service';
import { MockContext, createMockContext } from '../prisma/context';
import { AuthModule } from '../auth/auth.module';

describe('CommentController', () => {
	let controller: CommentController;
	let mockContext: MockContext;

	beforeEach(async () => {
		jest.resetAllMocks();
		createMockContext();

		const module: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule, AuthModule],
			controllers: [CommentController],
			providers: [CommentService, PrismaService],
		}).compile();

		controller = module.get<CommentController>(CommentController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
