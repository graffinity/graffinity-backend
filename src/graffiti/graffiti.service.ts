import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryEntry } from './dto/request/category-entry.dto';
import { CreateGraffitiDto } from './dto/request/create-graffiti.dto';
import { UpdateGraffitiDto } from './dto/request/update-graffiti.dto';

@Injectable()
export class GraffitiService {
	constructor(private prisma: PrismaService) {}

	async create(createGraffitiDto: CreateGraffitiDto) {
		return await this.prisma.graffiti.create({ data: createGraffitiDto });
	}

	async findAll() {
		return await this.prisma.graffiti.findMany();
	}

	async findOne(id: number) {
		let entity = await this.prisma.graffiti.findUniqueOrThrow({
			where: {
				id: id,
			},
		});
		return entity;
	}

	async findAllFilteredBy(userId?: number, categoryId?: number) {
		return await this.prisma.graffiti.findMany({
			where: {
				authorId: userId,
				categories: {
					some: {
						categoryId: categoryId,
					},
				},
			},
		});
	}

	async addCategoryToGraffiti(id: number, request: CategoryEntry) {
		let entity = await this.prisma.graffiti.update({
			where: {
				id: id,
			},
			data: {
				categories: {
					create: request.categoryIds.map((categoryId) => ({
						categoryId: categoryId,
					})),
				},
			},
		});
		console.log(entity);
		return entity;
	}

	async removeCategoryFromGraffiti(id: number, request: CategoryEntry) {
		let entity = await this.prisma.graffiti.update({
			where: {
				id: id,
			},
			data: {
				categories: {
					delete: request.categoryIds.map((categoryId) => ({ id: categoryId })),
				},
			},
		});
		console.log(entity);
		return entity;
	}

	async update(id: number, request: UpdateGraffitiDto) {
		return await this.prisma.graffiti.update({
			where: {
				id: id,
			},
			data: request,
		});
	}

	async delete(id: number) {
		return await this.prisma.graffiti.delete({
			where: {
				id: id,
			},
		});
	}
}
