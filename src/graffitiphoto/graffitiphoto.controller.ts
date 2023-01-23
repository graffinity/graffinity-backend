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
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateGraffitiPhotoDto } from './dto/request/create-graffitiphoto.dto';
import { UpdateGraffitiPhotoDto } from './dto/request/update-graffitiphoto.dto';
import { GraffitiPhotoService } from './graffitiphoto.service';
import GraffitiPhotoMapper from './mapper/GraffitiPhotoMapper';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@ApiTags('graffiti photo')
@Controller('api/v1/graffiti-photo')
export class GraffitiPhotoController {
	constructor(private readonly graffitiPhotoService: GraffitiPhotoService) {}

	@Post()
	@UseInterceptors(FileInterceptor('file'))
	@UseInterceptors()
	@ApiOperation({ summary: 'Create a GraffitiPhoto' })
	async create(
		@Body() body: string,
		@UploadedFile() file: Express.Multer.File,
		@Req() request: Request,
	) {
		let newBody = JSON.parse(JSON.stringify(body));
		let createGraffitiDto: CreateGraffitiPhotoDto = JSON.parse(newBody.body);

		let entity = await this.graffitiPhotoService.create(
			createGraffitiDto,
			file,
			request,
		);
		return GraffitiPhotoMapper.toResponse(entity);
	}

	@Get()
	@ApiOperation({ summary: 'Find all graffitiphoto' })
	async findAll() {
		let entities = await this.graffitiPhotoService.findAll();
		return GraffitiPhotoMapper.toResponses(entities);
	}

	@Get(':id')
	@ApiOperation({ summary: 'Find a graffitiphoto by id' })
	async findOne(@Param('id') id: string) {
		let entity = await this.graffitiPhotoService.findOne(+id);
		return GraffitiPhotoMapper.toResponse(entity);
	}

	@Put(':id')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Update a graffitiphoto entity by id' })
	async update(
		@Param('id') id: string,
		@Body() updateGraffitiPhotoDto: UpdateGraffitiPhotoDto,
		@Req() request: Request,
	) {
		let entity = await this.graffitiPhotoService.update(
			+id,
			updateGraffitiPhotoDto,
			request,
		);
		return GraffitiPhotoMapper.toResponse(entity);
	}

	@Put('/:id/likes/add')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Update photo likes by id' })
	async addLikesToPhoto(@Param('id') id: string, @Req() request: Request) {
		let entity = await this.graffitiPhotoService.addLikedPhoto(+id, request);
		return GraffitiPhotoMapper.toResponse(entity);
	}

	@Put('/:id/likes/remove')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Update photo likes by id' })
	async removeLikesFromPhoto(@Param('id') id: string, @Req() request: Request) {
		let entity = await this.graffitiPhotoService.removeLikedPhoto(+id, request);
		return GraffitiPhotoMapper.toResponse(entity);
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Delete a graffitiphoto by id' })
	async delete(@Param('id') id: string, @Req() request: Request) {
		let entity = await this.graffitiPhotoService.delete(+id, request);
		return GraffitiPhotoMapper.toResponse(entity);
	}
}
