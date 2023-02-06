import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Req,
	UploadedFile,
	UploadedFiles,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import {
	FileFieldsInterceptor,
	FileInterceptor,
} from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CreateGraffitiPhotoDto } from './dto/request/create-graffitiphoto.dto';
import { UpdateGraffitiPhotoDto } from './dto/request/update-graffitiphoto.dto';
import { GraffitiPhotoService } from './graffitiphoto.service';
import GraffitiPhotoMapper from './mapper/GraffitiPhotoMapper';
// Leave this import here, it is needed for the file interceptor
import { Multer } from 'multer';

@ApiTags('graffiti photo')
@Controller('api/v1/graffiti-photo')
export class GraffitiPhotoController {
	constructor(private readonly graffitiPhotoService: GraffitiPhotoService) {}

	@Post()
	@UseInterceptors(FileInterceptor('file'))
	@UseInterceptors()
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Create a GraffitiPhoto' })
	async create(
		@Body() body: string,
		@UploadedFile() file: Express.Multer.File,
		@Req() request: Request,
	) {
		let newBody = JSON.parse(JSON.stringify(body));
		let createGraffitiPhotoDto: CreateGraffitiPhotoDto = JSON.parse(
			newBody.body,
		);

		let entity = await this.graffitiPhotoService.create(
			createGraffitiPhotoDto,
			file,
			request,
		);
		return GraffitiPhotoMapper.toResponse(entity);
	}
	@Post('graffiti/:id/add-photo')
	@UseInterceptors(FileInterceptor('file'))
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Create a GraffitiPhoto' })
	async createWithParams(
		@Param('id') id: string,
		@UploadedFile() file: Express.Multer.File,
		@Req() request: Request,
	) {
		let createGraffitiPhotoDto: CreateGraffitiPhotoDto = {
			graffitiId: +id,
			addedAt: new Date(),
		};

		let entity = await this.graffitiPhotoService.create(
			createGraffitiPhotoDto,
			file,
			request,
		);
		return GraffitiPhotoMapper.toResponse(entity);
	}

	@Post('graffiti/:id/upload-multiple')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Upload multiple photos' })
	@UseInterceptors(
		FileFieldsInterceptor([
			{ name: 'image1', maxCount: 1 },
			{ name: 'image2', maxCount: 1 },
			{ name: 'image3', maxCount: 1 },
		]),
	)
	async uploadMultiplePhotos(
		@Param('id') id: string,
		@UploadedFiles()
		files: {
			image1: Express.Multer.File[];
			image2?: Express.Multer.File[];
			image3?: Express.Multer.File[];
		},
		@Req() request: Request,
	) {
		let images = files.image1;
		if (files.image2) images.push(files.image2[0]);
		if (files.image3) images.push(files.image3[0]);

		let createGraffitiPhotoDto: CreateGraffitiPhotoDto = {
			graffitiId: +id,
			addedAt: new Date(),
		};

		let entities: Prisma.BatchPayload =
			await this.graffitiPhotoService.createMultiple(
				createGraffitiPhotoDto,
				images,
				request,
			);
		return entities.count;
	}

	@Get()
	@ApiOperation({ summary: 'Find all Graffiti Photos' })
	async findAll() {
		let entities = await this.graffitiPhotoService.findAll();
		return GraffitiPhotoMapper.toResponses(entities);
	}

	@Get(':id')
	@ApiOperation({ summary: 'Find a Graffiti Photo by id' })
	async findOne(@Param('id') id: string) {
		let entity = await this.graffitiPhotoService.findOne(+id);
		return GraffitiPhotoMapper.toResponse(entity);
	}

	// Delete this method?
	@Put(':id')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Update a Graffiti Photo entity by id' })
	async update(
		@Param('id') id: string,
		@Body() body: string,
		@Req() request: Request,
	) {
		let newBody = JSON.parse(JSON.stringify(body));
		let updateGraffitiPhotoDto: UpdateGraffitiPhotoDto = JSON.parse(
			newBody.body,
		);

		let entity = await this.graffitiPhotoService.update(
			+id,
			updateGraffitiPhotoDto,
			request,
		);
		return GraffitiPhotoMapper.toResponse(entity);
	}

	@Put(':id/likes/add')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Update Graffiti Photo likes by id' })
	async addLikesToPhoto(@Param('id') id: string, @Req() request: Request) {
		let entity = await this.graffitiPhotoService.addLikedPhoto(+id, request);
		return GraffitiPhotoMapper.toResponse(entity);
	}

	@Put(':id/likes/remove')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Update Graffiti Photo likes by id' })
	async removeLikesFromPhoto(@Param('id') id: string, @Req() request: Request) {
		let entity = await this.graffitiPhotoService.removeLikedPhoto(+id, request);
		return GraffitiPhotoMapper.toResponse(entity);
	}

	@Get(':id/likes/count')
	@ApiOperation({ summary: 'Get Graffiti Photo likes count by id' })
	async getLikeCount(@Param('id') id: string): Promise<number> {
		let likeCount = await this.graffitiPhotoService.getLikeCount(+id);
		return likeCount;
	}

	@Get(':id/likes/is-liked')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({
		summary: 'Get info whether Graffiti Photo is liked by a logged in user',
	})
	async isLikedByUser(
		@Param('id') id: string,
		@Req() request: Request,
	): Promise<boolean> {
		let isLiked = await this.graffitiPhotoService.isLikedByUser(+id, request);
		return isLiked;
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Delete a Graffiti Photo by id' })
	async delete(@Param('id') id: string, @Req() request: Request) {
		let entity = await this.graffitiPhotoService.delete(+id, request);
		return GraffitiPhotoMapper.toResponse(entity);
	}
}
