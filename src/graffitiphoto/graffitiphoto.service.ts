import { Inject, Injectable } from '@nestjs/common';
import { MetadataService } from '../metadata/metadata.service';
import { MetadataServiceJS } from '../metadata/metadata.servicejs';
import { PrismaService } from '../prisma/prisma.service';
import { S3Service } from '../s3/S3service';
import { CreateGraffitiPhotoDto } from './dto/request/create-graffitiphoto.dto';
import { UpdateGraffitiPhotoDto } from './dto/request/update-graffitiphoto.dto';
import { LikesEntry } from './dto/request/LikesEntry';
import sharp from 'sharp';

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
		file.buffer = await this.MetadataService.removeMetadata(file);
		let md = await sharp(file.buffer).metadata();
		console.log('metadata111:', md);
		let exif = md.exif;

		console.log('exif111: ', exif);

		let filenameEnd = mimetypes[file.mimetype];
		if (filenameEnd) {
			file.originalname = file.originalname.replace(filenameEnd, 'png');
		}
		file.mimetype = 'image/png';

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

//   Image Extension   MIME Type
const mimetypes: {
	[key: string]: string;
} = {
	'image/x-jg': 'art',
	'image/bmp': 'bmp',
	'image/gif': 'gif',
	'image/ief': 'ief',
	'image/jpeg': 'jpg' || 'jpe' || 'jpeg',
	'image/x-macpaint': 'mac',
	'image/x-portable-bitmap': 'pbm',
	'image/x-portable-graymap': 'pgm',
	'image/pict': 'pic',
	'image/png': 'png',
	'image/x-portable-anymap': 'pnm',
	'image/x-portable-pixmap': 'ppm',
	'image/vnd.adobe.photoshop': 'psd',
	'image/x-quicktime': 'qtif',
	'image/x-cmu-raster': 'ras',
	'image/x-rgb': 'rgb',
	'image/svg+xml': 'svg',
	'image/tiff': 'tiff',
	'image/x-xbitmap': 'xbm',
	'image/x-xpixmap': 'xpm',
	'image/x-xwindowdump': 'xwd',
	'image/vnd.wap.wbmp': 'wbmp',
	'image/webp': 'webp',
};

const types2 = [
	'art',
	'bmp',
	'dib',
	'gif',
	'ief',
	'jpe',
	'jpeg',
	'jpg',
	'mac',
	'pbm',
	'pct',
	'pgm',
	'pic',
	'pict',
	'png',
	'pnm',
	'pnt',
	'ppm',
	'psd',
	'qti',
	'qtif',
	'ras',
	'rgb',
	'svg',
	'svgz',
	'tif',
	'tiff',
	'xbm',
	'xpm',
	'xwd',
	'wbmp',
];
