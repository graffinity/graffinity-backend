import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ArtistEntry } from './dto/request/artist-entry.dto';
import { CategoryEntry } from './dto/request/category-entry.dto';
import { CreateGraffitiDto } from './dto/request/create-graffiti.dto';
import { UpdateGraffitiDto } from './dto/request/update-graffiti.dto';

@Injectable()
export class GraffitiService {
	constructor(private prisma: PrismaService) {}

	async create(createGraffitiDto: CreateGraffitiDto) {
		return await this.prisma.graffiti.create({
			data: {
				name: createGraffitiDto.name,
				description: createGraffitiDto.description,
				author: {
					connect: {
						id: +createGraffitiDto.authorId,
					},
				},
				location: createGraffitiDto.location,
			},
			include: {
				photos: true,
			},
		});
	}

	async findAll() {
		return await this.prisma.graffiti.findMany({ include: { photos: true } });
	}

	async findPhotosById(id: number) {
		return await this.prisma.graffitiPhoto.findMany({
			where: {
				graffitiId: id,
			},
		});
	}

	async findOne(id: number) {
		let entity = await this.prisma.graffiti.findUniqueOrThrow({
			where: {
				id: id,
			},
			include: {
				photos: true,
			},
		});
		return entity;
	}

	async findAllFilteredBy(
		userId?: number,
		categoryId?: number,
		artistId?: number,
	) {
		return await this.prisma.graffiti.findMany({
			where: {
				authorId: userId,
				categories: {
					some: {
						categoryId: categoryId,
					},
				},
				artists: {
					some: {
						artistId: artistId,
					},
				},
			},
			include: {
				photos: true,
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
			include: {
				photos: true,
			},
		});
		return entity;
	}

	async removeCategoryFromGraffiti(id: number, request: CategoryEntry) {
		let entity = await this.prisma.graffiti.update({
			where: {
				id: id,
			},
			data: {
				categories: {
					deleteMany: request.categoryIds.map((categoryId) => ({
						categoryId: categoryId,
					})),
				},
			},
			include: {
				photos: true,
			},
		});
		return entity;
	}

	async addArtistToGraffiti(id: number, request: ArtistEntry) {
		let entity = await this.prisma.graffiti.update({
			where: {
				id: id,
			},
			data: {
				artists: {
					create: request.artistIds.map((artistId) => ({
						artistId: artistId,
					})),
				},
			},
			include: {
				photos: true,
			},
		});

		return entity;
	}

	async removeArtistFromGraffiti(id: number, request: ArtistEntry) {
		let entity = await this.prisma.graffiti.update({
			where: {
				id: id,
			},
			data: {
				artists: {
					deleteMany: request.artistIds.map((artistId) => ({
						artistId: artistId,
					})),
				},
			},
			include: {
				photos: true,
			},
		});

		return entity;
	}

	async update(id: number, request: UpdateGraffitiDto) {
		return await this.prisma.graffiti.update({
			where: {
				id: id,
			},
			data: request,
			include: {
				photos: true,
			},
		});
	}

	async delete(id: number) {
		return await this.prisma.graffiti.delete({
			where: {
				id: id,
			},
			include: {
				photos: true,
			},
		});
	}
}
