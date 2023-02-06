import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from '../auth/auth.module';
import { MockContext, createMockContext } from '../prisma/context';
import { PrismaService } from '../prisma/prisma.service';
import { UserRoleService } from '../userrole/userrole.service';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

describe('CommentController', () => {
	let controller: CommentController;
	let mockContext: MockContext;

	beforeEach(async () => {
		jest.resetAllMocks();
		createMockContext();

		const module: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule, AuthModule],
			controllers: [CommentController],
			providers: [CommentService, PrismaService, UserRoleService],
		}).compile();

		controller = module.get<CommentController>(CommentController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
