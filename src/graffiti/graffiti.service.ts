import {
	ConflictException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { GraffitiStatus, Prisma } from '@prisma/client';
import { Request } from 'express';
import { AuthService } from '../auth/auth.service';
import { GraffitiPhotoService } from '../graffitiphoto/graffitiphoto.service';
import { PrismaService } from '../prisma/prisma.service';
import LocationUtil from '../utils/location.util';
import { ArtistEntry } from './dto/request/artist-entry.dto';
import { CategoryEntry } from './dto/request/category-entry.dto';
import { CreateGraffitiDto } from './dto/request/create-graffiti.dto';
import { UpdateGraffitiDto } from './dto/request/update-graffiti.dto';
import { GraffitiEntity } from './entities/graffiti.entity';

@Injectable()
export class GraffitiService {
	constructor(
		private prisma: PrismaService,
		private authService: AuthService,
		private graffitiPhotoService: GraffitiPhotoService,
	) {}

	async create(createGraffitiDto: CreateGraffitiDto, request: Request) {
		let isUserLoggedIn = await this.authService.isLoggedIn(request);

		if (!isUserLoggedIn) {
			throw new UnauthorizedException('User is not logged in');
		}

		let user = await this.authService.getUserFromRequest(request);

		try {
			let entity = await this.prisma.graffiti.create({
				data: {
					name: createGraffitiDto.name,
					description: createGraffitiDto.description,
					author: {
						connect: {
							id: user?.userId,
						},
					},
					latitude: createGraffitiDto.latitude,
					longitude: createGraffitiDto.longitude,
					address: createGraffitiDto.address,
				},
				include: {
					photos: true,
				},
			});

			return entity;
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					throw new ConflictException(
						'There is a unique constraint violation, a new graffiti cannot be created with this name',
					);
				}
			}
			throw error;
		}
	}

	async findAll() {
		let entities = await this.prisma.graffiti.findMany({
			include: { photos: true },
		});
		entities = entities.map((entity) => {
			entity.photos;
			return entity;
		});
		return entities;
	}

	async findPhotosById(id: number) {
		return await this.prisma.graffitiPhoto.findMany({
			where: {
				graffitiId: id,
			},
		});
	}

	async findById(id: number) {
		let graffiti = await this.prisma.graffiti.findUniqueOrThrow({
			where: {
				id: id,
			},
			include: {
				photos: true,
			},
		});
		let status: GraffitiStatus = graffiti.status;
		let entity: GraffitiEntity = {
			...graffiti,
			photos: await this.graffitiPhotoService.sortGraffitiPhotos(
				graffiti.photos,
			),
		};

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

	async addCategoryToGraffiti(
		id: number,
		entry: CategoryEntry,
		request: Request,
	) {
		let isUserLoggedIn = await this.authService.isLoggedIn(request);
		if (!isUserLoggedIn) {
			throw new UnauthorizedException('User is not logged in');
		}

		let user = await this.authService.getUserFromRequest(request);
		let entity = await this.prisma.graffiti.findUniqueOrThrow({
			where: {
				id: id,
			},
		});
		if (entity.authorId !== user?.userId) {
			throw new UnauthorizedException('User is not authorized');
		}

		return await this.prisma.graffiti.update({
			where: {
				id: id,
			},
			data: {
				categories: {
					create: entry.categoryIds.map((categoryId) => ({
						categoryId: categoryId,
					})),
				},
			},
			include: {
				photos: true,
			},
		});
	}

	async removeCategoryFromGraffiti(
		id: number,
		entry: CategoryEntry,
		request: Request,
	) {
		let isUserLoggedIn = await this.authService.isLoggedIn(request);
		if (!isUserLoggedIn) {
			throw new UnauthorizedException('User is not logged in');
		}

		let user = await this.authService.getUserFromRequest(request);
		let entity = await this.prisma.graffiti.findUniqueOrThrow({
			where: {
				id: id,
			},
		});
		if (entity.authorId !== user?.userId) {
			throw new UnauthorizedException('User is not authorized');
		}

		return await this.prisma.graffiti.update({
			where: {
				id: id,
			},
			data: {
				categories: {
					deleteMany: entry.categoryIds.map((categoryId) => ({
						categoryId: categoryId,
					})),
				},
			},
			include: {
				photos: true,
			},
		});
	}

	async addArtistToGraffiti(id: number, entry: ArtistEntry, request: Request) {
		let isUserLoggedIn = await this.authService.isLoggedIn(request);
		if (!isUserLoggedIn) {
			throw new UnauthorizedException('User is not logged in');
		}

		let user = await this.authService.getUserFromRequest(request);
		let entity = await this.prisma.graffiti.findUniqueOrThrow({
			where: {
				id: id,
			},
		});
		if (entity.authorId !== user?.userId) {
			throw new UnauthorizedException('User is not authorized');
		}

		return await this.prisma.graffiti.update({
			where: {
				id: id,
			},
			data: {
				artists: {
					create: entry.artistIds.map((artistId) => ({
						artistId: artistId,
					})),
				},
			},
			include: {
				photos: true,
			},
		});
	}

	async removeArtistFromGraffiti(
		id: number,
		entry: ArtistEntry,
		request: Request,
	) {
		let isUserLoggedIn = await this.authService.isLoggedIn(request);
		if (!isUserLoggedIn) {
			throw new UnauthorizedException('User is not logged in');
		}

		let user = await this.authService.getUserFromRequest(request);
		let entity = await this.prisma.graffiti.findUniqueOrThrow({
			where: {
				id: id,
			},
		});
		if (entity.authorId !== user?.userId) {
			throw new UnauthorizedException('User is not authorized');
		}

		return await this.prisma.graffiti.update({
			where: {
				id: id,
			},
			data: {
				artists: {
					deleteMany: entry.artistIds.map((artistId) => ({
						artistId: artistId,
					})),
				},
			},
			include: {
				photos: true,
			},
		});
	}

	async update(
		id: number,
		updateGraffitiDto: UpdateGraffitiDto,
		request: Request,
	) {
		let isUserLoggedIn = await this.authService.isLoggedIn(request);
		if (!isUserLoggedIn) {
			throw new UnauthorizedException('User is not logged in');
		}

		let user = await this.authService.getUserFromRequest(request);
		let entity = await this.prisma.graffiti.findUniqueOrThrow({
			where: {
				id: id,
			},
		});

		let isUserAdmin = await this.authService.isUserAdmin(user.userId);
		if (!isUserAdmin) {
			if (entity.authorId !== user?.userId) {
				throw new UnauthorizedException('User is not authorized');
			}
		}

		return await this.prisma.graffiti.update({
			where: {
				id: id,
			},
			data: {
				name: updateGraffitiDto.name,
				description: updateGraffitiDto.description,
				latitude: updateGraffitiDto.latitude,
				longitude: updateGraffitiDto.longitude,
				address: updateGraffitiDto.address,
				categories: {
					create: updateGraffitiDto.categoryIds.map((categoryId) => ({
						categoryId: categoryId,
					})),
				},
				artists: {
					create: updateGraffitiDto.artistIds.map((artistId) => ({
						artistId: artistId,
					})),
				},
			},
			include: {
				photos: true,
			},
		});
	}

	async delete(id: number, request: Request) {
		let isUserLoggedIn = await this.authService.isLoggedIn(request);

		// Figure out
		if (!isUserLoggedIn) {
			throw new UnauthorizedException('User is not logged in');
		}

		let user = await this.authService.getUserFromRequest(request);

		let entity = await this.prisma.graffiti.findUniqueOrThrow({
			where: {
				id: id,
			},
		});

		let isUserAdmin = await this.authService.isUserAdmin(user.userId);
		if (!isUserAdmin) {
			if (entity.authorId !== user?.userId) {
				throw new UnauthorizedException('User is not authorized');
			}
		}

		return await this.prisma.graffiti.delete({
			where: {
				id: id,
			},
			include: {
				photos: true,
			},
		});
	}

	// Figure out
	async findNearbyGraffiti(userLatitude: string, userLongitude: string) {
		// Initialize the nearest neighbors array with the first graffiti in the list
		let entities: GraffitiEntity[] = await this.prisma.graffiti.findMany({
			include: { photos: true },
		});

		let mappedGraffiti = entities.map((graffitiEntity) => {
			let distance = LocationUtil.calculateDistanceBetweenCoordinates(
				userLatitude,
				userLongitude,
				graffitiEntity.latitude,
				graffitiEntity.longitude,
			);
			let distanceInMeters = Math.round(distance * 1000);
			graffitiEntity.distance = distanceInMeters;
			return graffitiEntity;
		});

		let closestGraffiti = mappedGraffiti.filter(
			(graffitiEntity) =>
				graffitiEntity.distance && graffitiEntity.distance <= 10000,
		);

		if (closestGraffiti.length <= 10) {
			return closestGraffiti;
		}

		let sortedGraffiti = closestGraffiti.sort(
			(a: GraffitiEntity, b: GraffitiEntity) => {
				if (!a.distance) {
					if (!b.distance) {
						return 0;
					}
					return 1;
				}
				if (!b.distance) {
					return -1;
				}
				return a.distance - b.distance;
			},
		);
		let nearestGraffiti = sortedGraffiti.slice(0, 10);

		return nearestGraffiti;
	}
}
