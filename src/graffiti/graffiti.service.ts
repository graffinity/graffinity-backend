import { Inject, Injectable } from '@nestjs/common';
import { Graffiti } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ArtistEntry } from './dto/request/artist-entry.dto';
import { CategoryEntry } from './dto/request/category-entry.dto';
import { CreateGraffitiDto } from './dto/request/create-graffiti.dto';
import { UpdateGraffitiDto } from './dto/request/update-graffiti.dto';

const EARTH_RADIUS_KM = 6371; // Earth's radius in kilometers

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

	async calculateDistance(
		lat1: string,
		lon1: string,
		lat2: string,
		lon2: string,
	) {
		const latitude1 = Number(lat1);
		const longitude1 = Number(lon1);
		const latitude2 = Number(lat2);
		const longitude2 = Number(lon2);

		let grafiti: Graffiti[] = await this.prisma.graffiti.findMany();
		const latDiff = this.toRadians(latitude2 - latitude1);
		const lonDiff = this.toRadians(longitude2 - longitude1);
		const a =
			Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
			Math.cos(this.toRadians(latitude1)) *
				Math.cos(this.toRadians(latitude2)) *
				Math.sin(lonDiff / 2) *
				Math.sin(lonDiff / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		return EARTH_RADIUS_KM * c;
	}

	// Convert degrees to radians
	toRadians(degrees: number): number {
		return degrees * (Math.PI / 180);
	}

	// Find the nearest neighbor graffiti to the given coordinates
	async findNearestNeighbor(
		graffitiList: Graffiti[],
		lat: string,
		lon: string,
	) {
		// Initialize the nearest neighbors array with the first graffiti in the list
		let nearestNeighbors: Graffiti[] = [graffitiList[0]];

		// Loop through the rest of the graffiti list and compare distances
		for (let i = 1; i < graffitiList.length; i++) {
			const graffiti = graffitiList[i];
			const distance = await this.calculateDistance(
				graffiti.latitude,
				graffiti.longitude,
				lat,
				lon,
			);
			if (distance >= 1) {
				nearestNeighbors.push(graffiti);
			}
		}

		return nearestNeighbors;
	}
}
