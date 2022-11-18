import {
	Controller,
	Get,
	Post,
	Body,
	Put,
	Param,
	Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/request/create-comment.dto';
import CommentMapper from './mapper/CommentMapper';

@ApiTags('comment')
@Controller('api/v1/comment')
export class CommentController {
	constructor(private readonly commentService: CommentService) {}

	@Post()
	@ApiOperation({ summary: 'Create a comment' })
	create(@Body() createCommentDto: CreateCommentDto) {
		return this.commentService.create(createCommentDto);
	}

	@Get()
	@ApiOperation({ summary: 'Find all comments' })
	async findAll() {
		let entities = await this.commentService.findAll();
		return CommentMapper.toResponses(entities);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete a comment by id' })
	async delete(@Param('id') id: string) {
		let entity = await this.commentService.delete(+id);
		return CommentMapper.toResponse(entity);
	}
}
