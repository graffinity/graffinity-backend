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
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ArtistEntry } from './dto/request/artist-entry.dto';
import { CategoryEntry } from './dto/request/category-entry.dto';
import { CreateGraffitiDto } from './dto/request/create-graffiti.dto';
import { UpdateGraffitiDto } from './dto/request/update-graffiti.dto';
import { GraffitiService } from './graffiti.service';
import GraffitiMapper from './mapper/GraffitiMapper';

@ApiTags('graffiti')
@Controller('api/v1/graffiti')
export class GraffitiController {
	constructor(private readonly graffitiService: GraffitiService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Create a graffiti post' })
	async create(
		@Body() createGraffitiDto: CreateGraffitiDto,
		@Req() request: Request,
	) {
		let entity = await this.graffitiService.create(createGraffitiDto, request);

		return GraffitiMapper.toResponse(entity);
	}

	@Get()
	@ApiOperation({
		summary: 'Find all graffiti posts',
	})
	async findAll() {
		let entities = await this.graffitiService.findAll();
		return GraffitiMapper.toResponses(entities);
	}
	@Get('nearby/:latitude/:longitude')
	@ApiOperation({
		summary: 'Find graffiti posts which are closest to the given coordinates',
	})
	async findNearbyGraffiti(
		@Param('latitude') latitude: string,
		@Param('longitude') longitude: string,
	) {
		let entities = await this.graffitiService.findNearbyGraffiti(
			latitude,
			longitude,
		);

		let responses = GraffitiMapper.toResponses(entities);
		console.log('responses: ', responses);
		return responses;
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
	async findById(@Param('id') id: string) {
		let entity = await this.graffitiService.findById(+id);
		return GraffitiMapper.toResponse(entity);
	}

	@Put(':id')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Update a graffiti post by id' })
	async update(
		@Param('id') id: string,
		@Body() updateGraffitiDto: UpdateGraffitiDto,
		@Req() request: Request,
	) {
		let entity = await this.graffitiService.update(
			+id,
			updateGraffitiDto,
			request,
		);
		return GraffitiMapper.toResponse(entity);
	}

	@Put('/:id/category/add')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Update a graffiti post by id' })
	async addCategoryToGraffiti(
		@Param('id') id: string,
		@Body() entry: CategoryEntry,
		@Req() request: Request,
	) {
		let entity = await this.graffitiService.addCategoryToGraffiti(
			+id,
			entry,
			request,
		);
		return GraffitiMapper.toResponse(entity);
	}

	@Put('/:id/category/remove')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Update a graffiti post by id' })
	async removeCategoryFromGraffiti(
		@Param('id') id: string,
		@Body() entry: CategoryEntry,
		@Req() request: Request,
	) {
		let entity = await this.graffitiService.addCategoryToGraffiti(
			+id,
			entry,
			request,
		);
		return GraffitiMapper.toResponse(entity);
	}

	@Put('/:id/artist/add')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Update a graffiti post by id' })
	async addArtistToGraffiti(
		@Param('id') id: string,
		@Body() entry: ArtistEntry,
		@Req() request: Request,
	) {
		let entity = await this.graffitiService.addArtistToGraffiti(
			+id,
			entry,
			request,
		);
		return GraffitiMapper.toResponse(entity);
	}

	@Put('/:id/artist/remove')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Update a graffiti post by id' })
	async removeArtistFromGraffiti(
		@Param('id') id: string,
		@Body() entry: ArtistEntry,
		@Req() request: Request,
	) {
		let entity = await this.graffitiService.removeArtistFromGraffiti(
			+id,
			entry,
			request,
		);
		return GraffitiMapper.toResponse(entity);
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Delete a graffiti post by id' })
	async delete(@Param('id') id: string, @Req() request: Request) {
		let entity = await this.graffitiService.delete(+id, request);
		return GraffitiMapper.toResponse(entity);
	}
}
