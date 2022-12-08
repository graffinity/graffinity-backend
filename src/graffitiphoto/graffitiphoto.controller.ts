import {
	Controller,
	Get,
	Post,
	Body,
	Put,
	Param,
	Delete,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GraffitiPhotoService } from './graffitiphoto.service';
import { CreateGraffitiPhotoDto } from './dto/request/create-graffitiphoto.dto';
import { UpdateGraffitiPhotoDto } from './dto/request/update-graffitiphoto.dto';
import GraffitiPhotoMapper from './mapper/GraffitiPhotoMapper';
import { IFile } from '../s3/S3service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('api/v1/graffiti-photo')
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
	) {
		let newBody = JSON.parse(JSON.stringify(body));
		let bruh: CreateGraffitiPhotoDto = JSON.parse(newBody.body);
		console.log('file', file);
		console.log('body', body);
		console.log('newBody', newBody);
		console.log('bruh', bruh);
		let entity = await this.graffitiPhotoService.create(bruh, file);
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
	@ApiOperation({ summary: 'Update a graffitiphoto entity by id' })
	async update(
		@Param('id') id: string,
		@Body() updateGraffitiPhotoDto: UpdateGraffitiPhotoDto,
	) {
		let entity = await this.graffitiPhotoService.update(
			+id,
			updateGraffitiPhotoDto,
		);
		return GraffitiPhotoMapper.toResponse(entity);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete a graffitiphoto by id' })
	async delete(@Param('id') id: string) {
		let entity = await this.graffitiPhotoService.delete(+id);
		return GraffitiPhotoMapper.toResponse(entity);
	}
}
