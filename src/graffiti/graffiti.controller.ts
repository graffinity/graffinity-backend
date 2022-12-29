import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Req,
	UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryEntry } from './dto/request/category-entry.dto';
import { ArtistEntry } from './dto/request/artist-entry.dto';
import { CreateGraffitiDto } from './dto/request/create-graffiti.dto';
import { UpdateGraffitiDto } from './dto/request/update-graffiti.dto';
import { GraffitiService } from './graffiti.service';
import GraffitiMapper from './mapper/GraffitiMapper';
import { AccessTokenStrategy } from '../auth/strategies/access-token.strategy';
import { Request } from 'express';
import Public from '../auth/decorators/public.decorator';
import AtGuard from '../auth/guards/access-token.guard';

@ApiTags('graffiti')
@Controller('api/v1/graffiti')
export class GraffitiController {
	constructor(private readonly graffitiService: GraffitiService) {}

	@Post()
	@ApiOperation({ summary: 'Create a graffiti post' })
	async create(@Body() createGraffitiDto: CreateGraffitiDto) {
		let entity = await this.graffitiService.create(createGraffitiDto);
		return GraffitiMapper.toResponse(entity);
	}

	@Get()
	@ApiOperation({
		summary: 'Find all graffiti posts',
	})
	async findAll(@Req() req: Request) {
		console.log('req', req);
		let huh = req.cookies;
		console.log('huh', huh);
		let entities = await this.graffitiService.findAll();
		return GraffitiMapper.toResponses(entities);
	}

	@Get('/filtered')
	@ApiOperation({
		summary: 'Find all graffiti posts filtered by',
	})
	async findAllFilteredBy(
		@Param() userId?: number,
		@Param() categoryId?: number,
		@Param() artistId?: number,
	) {
		let entities = await this.graffitiService.findAllFilteredBy(
			userId,
			categoryId,
			artistId,
		);
		return GraffitiMapper.toResponses(entities);
	}

	@Get(':id')
	@ApiOperation({ summary: 'Find a graffiti post by id' })
	async findOne(@Param('id') id: string) {
		let entity = await this.graffitiService.findOne(+id);
		return GraffitiMapper.toResponse(entity);
	}

	@Put(':id')
	@ApiOperation({ summary: 'Update a graffiti post by id' })
	async update(
		@Param('id') id: string,
		@Body() updateGraffitiDto: UpdateGraffitiDto,
	) {
		let entity = await this.graffitiService.update(+id, updateGraffitiDto);
		return GraffitiMapper.toResponse(entity);
	}

	@Put('/:id/category/add')
	@ApiOperation({ summary: 'Update a graffiti post by id' })
	async addCategoryToGraffiti(
		@Param('id') id: string,
		@Body() request: CategoryEntry,
	) {
		let entity = await this.graffitiService.addCategoryToGraffiti(+id, request);
		return GraffitiMapper.toResponse(entity);
	}

	@Put('/:id/category/remove')
	@ApiOperation({ summary: 'Update a graffiti post by id' })
	async removeCategoryFromGraffiti(
		@Param('id') id: string,
		@Body() request: CategoryEntry,
	) {
		let entity = await this.graffitiService.addCategoryToGraffiti(+id, request);
		return GraffitiMapper.toResponse(entity);
	}

	@Put('/:id/artist/add')
	@ApiOperation({ summary: 'Update a graffiti post by id' })
	async addArtistToGraffiti(
		@Param('id') id: string,
		@Body() request: ArtistEntry,
	) {
		let entity = await this.graffitiService.addArtistToGraffiti(+id, request);
		return GraffitiMapper.toResponse(entity);
	}

	@Put('/:id/artist/remove')
	@ApiOperation({ summary: 'Update a graffiti post by id' })
	async removeArtistFromGraffiti(
		@Param('id') id: string,
		@Body() request: ArtistEntry,
	) {
		let entity = await this.graffitiService.removeArtistFromGraffiti(
			+id,
			request,
		);
		return GraffitiMapper.toResponse(entity);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete a graffiti post by id' })
	async delete(@Param('id') id: string) {
		let entity = await this.graffitiService.delete(+id);
		return GraffitiMapper.toResponse(entity);
	}
}
