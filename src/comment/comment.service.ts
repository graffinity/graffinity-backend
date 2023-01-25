import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { sortBy } from 'sort-by-typescript';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/request/create-comment.dto';

@Injectable()
export class CommentService {
	constructor(
		private prisma: PrismaService,
		private authService: AuthService,
	) {}

	async create(createCommentDto: CreateCommentDto, request: Request) {
		let isUserLoggedIn = await this.authService.isLoggedIn(request);
		if (!isUserLoggedIn) {
			throw new UnauthorizedException('User is not logged in');
		}

		return await this.prisma.comment.create({ data: createCommentDto });
	}

	async findAll() {
		let entities = await this.prisma.comment.findMany({});

		entities.sort(sortBy('-createdAt'));
		return entities;
	}

	async delete(id: number, request: Request) {
		let isUserLoggedIn = await this.authService.isLoggedIn(request);
		if (!isUserLoggedIn) {
			throw new UnauthorizedException('User is not logged in');
		}

		let user = await this.authService.getUserFromRequest(request);
		let entity = await this.prisma.comment.findUnique({
			where: {
				id: id,
			},
		});

		if (entity && entity.userId !== user.userId) {
			throw new UnauthorizedException('Wrong user');
		}

		return await this.prisma.comment.delete({
			where: {
				id: id,
			},
		});
	}
}
