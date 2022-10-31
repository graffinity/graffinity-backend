import { Injectable } from "@nestjs/common";
import { GraffitiService } from "../graffiti/graffiti.service";
import { PrismaService } from "../prisma/prisma.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Injectable()
export class CategoryService {
	constructor(private prisma: PrismaService) {}
	
	findAll() {
		return this.prisma.category.findMany();
	}
	
	findOne(id: number) {
		return this.prisma.category.findUnique({
			where: {
				id: id,
			},
		});
	}

	create(createCategoryDto: CreateCategoryDto) {
		return this.prisma.category.create({ data: {
			name: createCategoryDto.name,
			graffitis: {
				create: createCategoryDto.graffitiIds.map((graffitiId) => ({graffitiId: graffitiId })),
			}
		} });
	}

	update(id: number, updateCategoryDto: UpdateCategoryDto) {
		return this.prisma.category.update({
			where: {
				id: id,
			},
			data: updateCategoryDto,
		});
	}

	delete(id: number) {
		return this.prisma.category.delete({
			where: {
				id: id,
			},
		});
	}
}
