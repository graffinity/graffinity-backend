import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/request/create-category.dto';
import { UpdateCategoryDto } from './dto/request/update-category.dto';

@Injectable()
export class CategoryService {
	constructor(private prisma: PrismaService) {}

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

	async create(createCategoryDto: CreateCategoryDto) {
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

	async update(id: number, updateCategoryDto: UpdateCategoryDto) {
		return await this.prisma.category.update({
			where: {
				id: id,
			},
			data: updateCategoryDto,
		});
	}

	async delete(id: number) {
		return await this.prisma.category.delete({
			where: {
				id: id,
			},
		});
	}
}
