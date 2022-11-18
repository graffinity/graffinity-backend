import { Injectable } from '@nestjs/common';
import { createDeflate } from 'zlib';
import { PrismaService } from '../prisma/prisma.service';
import { sortBy } from 'sort-by-typescript';
import { CreateCommentDto } from './dto/request/create-comment.dto';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentService {
	constructor(private prisma: PrismaService) {}

	async create(createCommentDto: CreateCommentDto) {
		return await this.prisma.comment.create({ data: createCommentDto });
	}

	async findAll() {
		let entities = await this.prisma.comment.findMany({});

		entities.sort(sortBy('-createdAt'));
		return entities;
	}

	async delete(id: number) {
		return await this.prisma.comment.delete({
			where: {
				id: id,
			},
		});
	}
}
