import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { GraffitiPhoto } from '@prisma/client';
import { Request } from 'express';
import { AuthService } from '../auth/auth.service';
import { MetadataService } from '../metadata/metadata.service';
import { PrismaService } from '../prisma/prisma.service';
import { S3Service } from '../s3/S3service';
import { CreateGraffitiPhotoDto } from './dto/request/create-graffitiphoto.dto';
import { UpdateGraffitiPhotoDto } from './dto/request/update-graffitiphoto.dto';
import { GraffitiPhotoEntity } from './entities/graffitiphoto.entity';

type File = Express.Multer.File;

@Injectable()
export class GraffitiPhotoService {
	metadataService: MetadataService;
	constructor(
		private prisma: PrismaService,
		private S3Service: S3Service,
		private authService: AuthService,
	) {
		this.metadataService = new MetadataService();
	}

	async create(
		createGraffitiPhotoDto: CreateGraffitiPhotoDto,
		file: File,
		request: Request,
	) {
		let user = await this.authService.userAuthValidation(request);

		// Metadata extraction
		let metadata = await this.metadataService.getMetadata(file);

		// Calculate picture score
		let localPictureScore = this.metadataService.calculatePictureScore(
			metadata.metadata,
			metadata.tags,
		);

		// Remove metadata from file
		file.buffer = await this.metadataService.removeMetadata(file);

		// Convert file to png
		[file.originalname, file.mimetype] =
			this.metadataService.convertToPng(file);

		// Upload file to S3
		let response = await this.S3Service.uploadFile(file);

		return await this.prisma.graffitiPhoto.upsert({
			create: {
				url: response.Location,
				addedAt: createGraffitiPhotoDto.addedAt,
				pictureScore: localPictureScore,
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

	createMultiple = async (
		createGraffitiPhotoDto: CreateGraffitiPhotoDto,
		images: File[],
		request: Request,
	) => {
		let jwtPayload = await this.authService.userAuthValidation(request);

		let tempImages = images.map(async (image) => {
			// Metadata extraction
			let metadata = await this.metadataService.getMetadata(image);

			// Calculate picture score
			let localPictureScore = this.metadataService.calculatePictureScore(
				metadata.metadata,
				metadata.tags,
			);

			// Remove metadata from file
			image.buffer = await this.metadataService.removeMetadata(image);

			// Convert file to png
			[image.originalname, image.mimetype] =
				this.metadataService.convertToPng(image);

			// Upload file to S3
			let response = await this.S3Service.uploadFile(image);

			return {
				image: image,
				localPictureScore: localPictureScore,
				url: response.Location,
			};
		});

		// Map and await all promises
		let imageEntities: {
			image: File;
			localPictureScore: number;
			url: string;
		}[] = await Promise.all(tempImages);

		let entities = await this.prisma.graffitiPhoto.createMany({
			data: imageEntities.map((imageEntity) => {
				return {
					url: imageEntity.url,
					graffitiId: createGraffitiPhotoDto.graffitiId,
					userId: jwtPayload.userId,
					pictureScore: imageEntity.localPictureScore,
				};
			}),
			skipDuplicates: true,
		});

		return entities;
	};

	async findAll() {
		let entities = await this.prisma.graffitiPhoto.findMany();

		return entities;
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

		let entity = await this.prisma.graffitiPhoto.findUniqueOrThrow({
			where: {
				id: id,
			},
			include: {
				likes: true,
			},
		});

		if (entity.likes.find((like) => like.userId === user.userId)) {
			throw new BadRequestException('User already liked this photo');
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

		let entity = await this.prisma.graffitiPhoto.findUniqueOrThrow({
			where: {
				id: id,
			},
			include: {
				likes: true,
			},
		});

		if (!entity.likes.find((like) => like.userId === user.userId)) {
			throw new BadRequestException('User has not liked this photo');
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

	async findLikesByPhotoId(id: number) {
		let entity = await this.prisma.graffitiPhoto.findUniqueOrThrow({
			where: {
				id: id,
			},
			include: {
				likes: true,
			},
		});
		return entity.likes;
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

		await this.prisma.graffitiPhoto.update({
			where: {
				id: id,
			},
			data: {
				likes: {
					deleteMany: {},
				},
			},
		});

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

	sortByPictureScore(entities: GraffitiPhotoEntity[]) {
		let sortedByPictureScore = entities.sort((photo1, photo2) => {
			if (photo1.pictureScore === null) {
				if (photo2.pictureScore === null) {
					return 0;
				}
				return 1;
			} else if (photo2.pictureScore === null) {
				if (photo1.pictureScore === null) {
					return 0;
				}
				return -1;
			}
			return photo2.pictureScore - photo1.pictureScore;
		});

		return sortedByPictureScore;
	}

	sortByLikeCount(entities: GraffitiPhotoEntity[]) {
		let sortedByLikeCount = entities.sort((photo1, photo2) => {
			if (photo1.likes?.length === 0 || !photo1.likes?.length) {
				if (photo2.likes?.length === 0) {
					return 0;
				}
				return 1;
			}
			if (photo2.likes?.length === 0 || !photo2.likes?.length) {
				if (photo1.likes?.length === 0) {
					return 0;
				}
				return -1;
			}
			return photo2.likes.length - photo1.likes.length;
		});

		return sortedByLikeCount;
	}

	sortGraffitiPhotos = async (photos: GraffitiPhoto[]) => {
		let promise = photos.map(async (photo) => {
			let likes = await this.findLikesByPhotoId(photo.id);

			let graffitiPhotoEntity: GraffitiPhotoEntity = {
				...photo,
				likes: likes,
			};
			return graffitiPhotoEntity;
		});

		let photosWithLikes = await Promise.all(promise);
		let sortedByPictureScore = this.sortByPictureScore(photosWithLikes);
		let sortedByLikeCount = this.sortByLikeCount(sortedByPictureScore);

		return sortedByLikeCount;
	};
}

// Image Extension MIME Type
export const mimetypes: {
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
