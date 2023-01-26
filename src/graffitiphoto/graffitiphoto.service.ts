import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import sharp from 'sharp';
import { AuthService } from '../auth/auth.service';
import { MetadataServiceJS } from '../metadata/metadata.servicejs';
import { PrismaService } from '../prisma/prisma.service';
import { S3Service } from '../s3/S3service';
import { CreateGraffitiPhotoDto } from './dto/request/create-graffitiphoto.dto';
import { UpdateGraffitiPhotoDto } from './dto/request/update-graffitiphoto.dto';

type File = Express.Multer.File;

@Injectable()
export class GraffitiPhotoService {
	constructor(
		private prisma: PrismaService,
		private S3Service: S3Service,
		private MetadataService: MetadataServiceJS,
		private authService: AuthService,
	) {}

	async create(
		createGraffitiPhotoDto: CreateGraffitiPhotoDto,
		file: File,
		request: Request,
	) {
		let isUserLoggedIn = await this.authService.isLoggedIn(request);

		if (!isUserLoggedIn) {
			throw new UnauthorizedException('User is not logged in');
		}

		let user = await this.authService.getUserFromRequest(request);
		if (!user) {
			throw new UnauthorizedException('User is not logged in');
		}

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
						id: user.userId,
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
						id: user.userId,
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
			include: {
				likes: true,
			},
		});
		return entity;
	}

	async update(
		id: number,
		updateGraffitiPhotoDto: UpdateGraffitiPhotoDto,
		request: Request,
	) {
		let isUserLoggedIn = await this.authService.isLoggedIn(request);
		if (!isUserLoggedIn) {
			throw new UnauthorizedException('User is not logged in');
		}

		let user = await this.authService.getUserFromRequest(request);
		let entity = await this.prisma.graffitiPhoto.findUniqueOrThrow({
			where: {
				id: id,
			},
		});
		if (entity.userId !== user?.userId) {
			throw new UnauthorizedException('User is not authorized');
		}

		return await this.prisma.graffitiPhoto.update({
			where: {
				id: id,
			},
			data: updateGraffitiPhotoDto,
		});
	}

	async addLikedPhoto(id: number, request: Request) {
		let isUserLoggedIn = await this.authService.isLoggedIn(request);
		if (!isUserLoggedIn) {
			throw new UnauthorizedException('User is not logged in');
		}
		let user = await this.authService.getUserFromRequest(request);
		if (!user || !user.userId) {
			throw new UnauthorizedException('User does not exist');
		}

		return await this.prisma.graffitiPhoto.update({
			where: {
				id: id,
			},
			data: {
				likes: {
					create: {
						userId: user.userId,
					},
				},
			},
			include: {
				likes: true,
			},
		});
	}

	async removeLikedPhoto(id: number, request: Request) {
		let isUserLoggedIn = await this.authService.isLoggedIn(request);
		if (!isUserLoggedIn) {
			throw new UnauthorizedException('User is not logged in');
		}
		let user = await this.authService.getUserFromRequest(request);
		if (!user || !user.userId) {
			throw new UnauthorizedException('User does not exist');
		}

		return await this.prisma.graffitiPhoto.update({
			where: {
				id: id,
			},
			data: {
				likes: {
					delete: {
						userId_graffitiPhotoId: {
							userId: user.userId,
							graffitiPhotoId: id,
						},
					},
				},
			},
			include: {
				likes: true,
			},
		});
	}

	async delete(id: number, request: Request) {
		let isUserLoggedIn = await this.authService.isLoggedIn(request);
		if (!isUserLoggedIn) {
			throw new UnauthorizedException('User is not logged in');
		}

		let user = await this.authService.getUserFromRequest(request);
		let entity = await this.prisma.graffitiPhoto.findUniqueOrThrow({
			where: {
				id: id,
			},
		});
		if (entity.userId !== user?.userId) {
			throw new UnauthorizedException('User is not authorized');
		}

		return await this.prisma.graffitiPhoto.delete({
			where: {
				id: id,
			},
		});
	}

	async findAllFilteredBy() {
		return await this.prisma.graffitiPhoto.findMany({});
	}

	async getLikeCount(id: number) {
		let entity = await this.prisma.graffitiPhoto.findUniqueOrThrow({
			where: {
				id: id,
			},
			include: {
				likes: true,
			},
		});

		return entity.likes.length;
	}

	async isLikedByUser(id: number, request: Request) {
		let isUserLoggedIn = await this.authService.isLoggedIn(request);
		if (!isUserLoggedIn) {
			return false;
		}

		let user = await this.authService.getUserFromRequest(request);
		if (!user || !user.userId) {
			return false;
		}

		let entity = await this.prisma.graffitiPhoto.findUniqueOrThrow({
			where: {
				id: id,
			},
			include: {
				likes: {
					where: {
						userId: user.userId,
					},
				},
			},
		});

		return entity.likes.length > 0;
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
