import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ArtistEntry } from './dto/request/artist-entry.dto';
import { CategoryEntry } from './dto/request/category-entry.dto';
import { CreateGraffitiDto } from './dto/request/create-graffiti.dto';
import { UpdateGraffitiDto } from './dto/request/update-graffiti.dto';
import { GraffitiPhotoService } from '../graffitiphoto/graffitiphoto.service';

@Injectable()
export class GraffitiService {
	constructor(
		private prisma: PrismaService,
		@Inject(GraffitiPhotoService)
		private graffitiPhotoService: GraffitiPhotoService,
	) {}

	async create(createGraffitiDto: CreateGraffitiDto) {
		return await this.prisma.graffiti.create({
			data: createGraffitiDto,
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
					delete: request.categoryIds.map((categoryId) => ({ id: categoryId })),
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
					delete: request.artistIds.map((artistId) => ({ id: artistId })),
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
