import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

describe('CommentController', () => {
	let controller: CommentController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [CommentController],
			providers: [PrismaService, CommentService],
		}).compile();

		controller = module.get<CommentController>(CommentController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
