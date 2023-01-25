import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/request/create-category.dto';
import { UpdateCategoryDto } from './dto/request/update-category.dto';
import { Request } from 'express';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class CategoryService {
	constructor(
		private prisma: PrismaService,
		private authService: AuthService,
	) {}

	async findAll() {
		return await this.prisma.category.findMany();
	}

	async findOne(id: number) {
		return await this.prisma.category.findUnique({
			where: {
				id: id,
			},
		});
	}

	async create(createCategoryDto: CreateCategoryDto, request: Request) {
		let isUserLoggedIn = await this.authService.isLoggedIn(request);
		if (!isUserLoggedIn) {
			throw new UnauthorizedException('User is not logged in');
		}

		return await this.prisma.category.create({
			data: {
				name: createCategoryDto.name,
				graffitis: {
					create: createCategoryDto.graffitiIds.map((graffitiId) => ({
						graffitiId: graffitiId,
					})),
				},
			},
		});
	}

	async update(
		id: number,
		updateCategoryDto: UpdateCategoryDto,
		request: Request,
	) {
		let isUserLoggedIn = await this.authService.isLoggedIn(request);
		if (!isUserLoggedIn) {
			throw new UnauthorizedException('User is not logged in');
		}

		return await this.prisma.category.update({
			where: {
				id: id,
			},
			data: updateCategoryDto,
		});
	}

	async delete(id: number, request: Request) {
		let isUserLoggedIn = await this.authService.isLoggedIn(request);

		if (!isUserLoggedIn) {
			throw new UnauthorizedException('User is not logged in');
		}

		// TODO: Add admin check

		return await this.prisma.category.delete({
			where: {
				id: id,
			},
		});
	}
}
