import {
	Controller,
	Get,
	Post,
	Body,
	Put,
	Param,
	Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GraffitiPhotoService } from './graffitiphoto.service';
import { CreateGraffitiPhotoDto } from './dto/request/create-graffitiphoto.dto';
import { UpdateGraffitiPhotoDto } from './dto/request/update-graffitiphoto.dto';
import GraffitiPhotoMapper from './mapper/GraffitiPhotoMapper';

@ApiTags('graffitiphoto')
@Controller('api/v1/graffitiphoto')
export class GraffitiPhotoController {
	constructor(private readonly graffitiPhotoService: GraffitiPhotoService) {}

	@Post()
	@ApiOperation({ summary: 'Create a graffitiphoto entity' })
	create(@Body() createGraffitiPhotoDto: CreateGraffitiPhotoDto) {
		return this.graffitiPhotoService.create(createGraffitiPhotoDto);
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
