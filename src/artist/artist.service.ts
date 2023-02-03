import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArtistDto } from './dto/request/create-artist.dto';
import { GraffitiEntry } from './dto/request/graffiti-entry.dto';
import { UpdateArtistDto } from './dto/request/update-artist.dto';
import { AuthService } from '../auth/auth.service';
@Injectable()
export class ArtistService {
	constructor(
		private prisma: PrismaService,
		private authService: AuthService,
	) {}

	async create(createArtistDto: CreateArtistDto, request: Request) {
		let isUserLoggedIn = await this.authService.isLoggedIn(request);
		if (!isUserLoggedIn) {
			throw new UnauthorizedException('User is not logged in');
		}

		return await this.prisma.artist.create({
			data: {
				name: createArtistDto.name,
				surname: createArtistDto.surname,
				graffitis: {
					create: createArtistDto.graffitiIds.map((graffitiId) => ({
						graffitiId: graffitiId,
					})),
				},
			},
		});
	}

	async findAll() {
		return await this.prisma.artist.findMany();
	}

	async findOne(id: number) {
		let entity = await this.prisma.artist.findUniqueOrThrow({
			where: {
				id: id,
			},
		});
		return entity;
	}

	async addGraffitiToArtist(
		id: number,
		entry: GraffitiEntry,
		request: Request,
	) {
		let isUserLoggedIn = await this.authService.isLoggedIn(request);
		if (!isUserLoggedIn) {
			throw new UnauthorizedException('User is not logged in');
		}

		let entity = await this.prisma.artist.update({
			where: {
				id: id,
			},
			data: {
				graffitis: {
					create: entry.graffitiIds.map((graffitiId) => ({
						graffitiId: graffitiId,
					})),
				},
			},
		});
		return entity;
	}

	async removeGraffitiFromArtist(
		id: number,
		entry: GraffitiEntry,
		request: Request,
	) {
		let isUserLoggedIn = await this.authService.isLoggedIn(request);
		if (!isUserLoggedIn) {
			throw new UnauthorizedException('User is not logged in');
		}

		let entity = await this.prisma.artist.update({
			where: {
				id: id,
			},
			data: {
				graffitis: {
					deleteMany: entry.graffitiIds.map((graffitiId) => ({
						graffitiId: graffitiId,
					})),
				},
			},
		});
		return entity;
	}

	async update(id: number, updateArtistDto: UpdateArtistDto, request: Request) {
		let isUserLoggedIn = await this.authService.isLoggedIn(request);
		if (!isUserLoggedIn) {
			throw new UnauthorizedException('User is not logged in');
		}

		return await this.prisma.artist.update({
			where: {
				id: id,
			},
			data: updateArtistDto,
		});
	}

	async delete(id: number, request: Request) {
		let isUserLoggedIn = await this.authService.isLoggedIn(request);
		if (!isUserLoggedIn) {
			throw new UnauthorizedException('User is not logged in');
		}

		return await this.prisma.artist.delete({
			where: {
				id: id,
			},

			select: {
				id: true,
				name: true,
				surname: true,
				graffitis: true,
			},
		});
	}
}
