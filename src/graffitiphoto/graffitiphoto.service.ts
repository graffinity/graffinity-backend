import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGraffitiPhotoDto } from './dto/request/create-graffitiphoto.dto';
import { UpdateGraffitiPhotoDto } from './dto/request/update-graffitiphoto.dto';

@Injectable()
export class GraffitiPhotoService {
	constructor(private prisma: PrismaService) {}

	async create(createGraffitiPhotoDto: CreateGraffitiPhotoDto) {
		return await this.prisma.graffitiPhoto.create({
			data: {
				url: createGraffitiPhotoDto.url,
				addedAt: createGraffitiPhotoDto.addedAt,
				user: {
					connect: {
						id: createGraffitiPhotoDto.userId,
					},
				},
				graffiti: {
					connect: {
						id: createGraffitiPhotoDto.graffitiId,
					},
				},
			},
		});
	}

	async findAll() {
		return await this.prisma.graffitiPhoto.findMany();
	}

	async findOne(id: number) {
		let entity = await this.prisma.graffitiPhoto.findUniqueOrThrow({
			where: {
				id: id,
			},
		});
		return entity;
	}

	async update(id: number, updateGraffitiPhotoDto: UpdateGraffitiPhotoDto) {
		return await this.prisma.graffitiPhoto.update({
			where: {
				id: id,
			},
			data: updateGraffitiPhotoDto,
		});
	}

	async delete(id: number) {
		return await this.prisma.graffitiPhoto.delete({
			where: {
				id: id,
			},
		});
	}

	async findAllFilteredBy() {
		return await this.prisma.graffitiPhoto.findMany({});
	}
}
