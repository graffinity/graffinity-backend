import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { S3Service } from '../s3/S3service';
import { CreateGraffitiPhotoDto } from './dto/request/create-graffitiphoto.dto';
import { UpdateGraffitiPhotoDto } from './dto/request/update-graffitiphoto.dto';
import { MetadataService } from '../metadata/metadata.service';
import { MetadataServiceJS } from '../metadata/metadata.servicejs';
import { LikesEntry } from './dto/request/LikesEntry';

@Injectable()
export class GraffitiPhotoService {
	constructor(
		private prisma: PrismaService,
		@Inject(S3Service)
		private S3Service: S3Service,

		@Inject(MetadataService)
		private metadataService: MetadataService,
		private MetadataService: MetadataServiceJS,
	) {}

	async create(
		createGraffitiPhotoDto: CreateGraffitiPhotoDto,
		file: Express.Multer.File,
	) {
		let metadata = await this.metadataService.getMetadata(file);
		let metadataJS = await this.MetadataService.getMetadata(file);

		let response = await this.S3Service.uploadFile(file);

		return await this.prisma.graffitiPhoto.upsert({
			create: {
				url: response.Location,
				addedAt: createGraffitiPhotoDto.addedAt,
				user: {
					connect: {
						id: createGraffitiPhotoDto.userId ?? 1,
					},
				},
				graffiti: {
					connect: {
						id: createGraffitiPhotoDto.graffitiId,
					},
				},
			},
			update: {
				url: response.Location,
				addedAt: createGraffitiPhotoDto.addedAt,
				user: {
					connect: {
						id: createGraffitiPhotoDto.userId ?? 1,
					},
				},
				graffiti: {
					connect: {
						id: createGraffitiPhotoDto.graffitiId,
					},
				},
			},
			where: {
				url: response.Location,
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

	async addLikedPhoto(id: number, request: LikesEntry) {
		let entity = await this.prisma.graffitiPhoto.update({
			where: {
				id: id,
			},
			data: {
				likes: {
					create: request.userId.map((userId) => ({
						userId: userId,
					})),
				},
			},
		});
		console.log(entity);
		return entity;
	}

	async removeLikedPhoto(id: number, request: LikesEntry) {
		let entity = await this.prisma.graffitiPhoto.update({
			where: {
				id: id,
			},
			data: {
				likes: {
					delete: request.userId.map((userId) => ({
						id: userId,
					})),
				},
			},
		});
		console.log(entity);
		return entity;
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
