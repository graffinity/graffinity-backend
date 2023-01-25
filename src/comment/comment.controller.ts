import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Req,
	UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/request/create-comment.dto';
import CommentMapper from './mapper/CommentMapper';
import { Request } from 'express';

@ApiTags('comment')
@Controller('api/v1/comment')
export class CommentController {
	constructor(private readonly commentService: CommentService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Create a comment' })
	async create(
		@Body() createCommentDto: CreateCommentDto,
		@Req() request: Request,
	) {
		let entity = await this.commentService.create(createCommentDto, request);
		return CommentMapper.toResponse(entity);
	}

	@Get()
	@ApiOperation({ summary: 'Find all comments' })
	async findAll() {
		let entities = await this.commentService.findAll();
		return CommentMapper.toResponses(entities);
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Delete a comment by id' })
	async delete(@Param('id') id: string, @Req() request: Request) {
		let entity = await this.commentService.delete(+id, request);
		return CommentMapper.toResponse(entity);
	}
}
