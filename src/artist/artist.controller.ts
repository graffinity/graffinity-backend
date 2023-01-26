import {
	Controller,
	Get,
	Post,
	Body,
	Put,
	Param,
	Delete,
	UseGuards,
	Req,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/request/create-artist.dto';
import { GraffitiEntry } from './dto/request/graffiti-entry.dto';
import { UpdateArtistDto } from './dto/request/update-artist.dto';
import ArtistMapper from './mapper/ArtistMapper';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Request } from 'express';

@ApiTags('artist')
@Controller('api/v1/artist')
export class ArtistController {
	constructor(private readonly artistService: ArtistService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Create an artist entity' })
	async create(
		@Body() createArtistDto: CreateArtistDto,
		@Req() request: Request,
	) {
		let entity = await this.artistService.create(createArtistDto, request);
		return ArtistMapper.toResponse(entity);
	}

	@Get()
	@ApiOperation({ summary: 'Find all artists' })
	async findAll() {
		let entities = await this.artistService.findAll();
		return ArtistMapper.toResponses(entities);
	}

	@Get(':id')
	@ApiOperation({ summary: 'Find an artist by id' })
	async findOne(@Param('id') id: string) {
		let entity = await this.artistService.findOne(+id);
		return ArtistMapper.toResponse(entity);
	}

	@Put('/:id/graffiti/add')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Update an artist post by id' })
	async addGraffitiToArtist(
		@Param('id') id: string,
		@Body() entry: GraffitiEntry,
		@Req() request: Request,
	) {
		let entity = await this.artistService.addGraffitiToArtist(
			+id,
			entry,
			request,
		);
		return ArtistMapper.toResponse(entity);
	}

	@Put('/:id/graffiti/remove')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Update an artist post by id' })
	async removeGraffitiFromArtist(
		@Param('id') id: string,
		@Body() entry: GraffitiEntry,
		@Req() request: Request,
	) {
		let entity = await this.artistService.removeGraffitiFromArtist(
			+id,
			entry,
			request,
		);
		return ArtistMapper.toResponse(entity);
	}

	@Put(':id')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Update an artist entity by id' })
	async update(
		@Param('id') id: string,
		@Body() updateArtistDto: UpdateArtistDto,
		@Req() request: Request,
	) {
		let entity = await this.artistService.update(+id, updateArtistDto, request);
		return ArtistMapper.toResponse(entity);
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Delete an artist by id' })
	async delete(@Param('id') id: string, @Req() request: Request) {
		let entity = await this.artistService.delete(+id, request);
		return ArtistMapper.toResponse(entity);
	}
}
