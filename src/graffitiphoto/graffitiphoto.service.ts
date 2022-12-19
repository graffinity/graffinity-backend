import { Inject, Injectable } from '@nestjs/common';
import { MetadataService } from 'aws-sdk';
import { MetadataStrippingService } from '../Metadata/metadataStripping.service';
import { PrismaService } from '../prisma/prisma.service';
import { S3Service } from '../s3/S3service';
import { CreateGraffitiPhotoDto } from './dto/request/create-graffitiphoto.dto';
import { UpdateGraffitiPhotoDto } from './dto/request/update-graffitiphoto.dto';

@Injectable()
export class GraffitiPhotoService {
	constructor(private prisma: PrismaService) {}
	@Inject(S3Service)
	private S3Service: S3Service;

	@Inject(MetadataStrippingService)
	private metadataStrippingService: MetadataStrippingService;

	async create(
		createGraffitiPhotoDto: CreateGraffitiPhotoDto,
		file: Express.Multer.File,
	) {
		await this.metadataStrippingService.stripMetadata(file.buffer);
		await this.S3Service.uploadFile(createGraffitiPhotoDto.file, file);
		return await this.prisma.graffitiPhoto.create({
			data: {
				url: createGraffitiPhotoDto.url,
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
