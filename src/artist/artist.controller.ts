import {
	Controller,
	Get,
	Post,
	Body,
	Put,
	Param,
	Delete,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { ArtistService } from "./artist.service";
import { CreateArtistDto } from "./dto/request/create-artist.dto";
import { UpdateArtistDto } from "./dto/request/update-artist.dto";
import ArtistMapper from "./mapper/ArtistMapper";

@ApiTags("artist")
@Controller("api/v1/artist")
export class ArtistController {
	constructor(private readonly artistService: ArtistService) {}

	@Post()
	@ApiOperation({ summary: "Create an artist entity" })
	create(@Body() createArtistDto: CreateArtistDto) {
		return this.artistService.create(createArtistDto);
	}

	@Get()
	@ApiOperation({ summary: "Find all artists" })
	async findAll() {
		let entities = await this.artistService.findAll();
		return ArtistMapper.toResponses(entities);
	}

	@Get(":id")
	@ApiOperation({ summary: "Find an artist by id" })
	async findOne(@Param("id") id: string) {
		let entity = await this.artistService.findOne(+id);
		return ArtistMapper.toResponse(entity);
	}

	@Put(":id")
	@ApiOperation({ summary: "Update an artist entity by id" })
	async update(@Param("id") id: string, @Body() updateArtistDto: UpdateArtistDto) {
		let entity = await this.artistService.update(+id, updateArtistDto);
		return ArtistMapper.toResponse(entity);
	}

	@Delete(":id")
	@ApiOperation({ summary: "Delete an artist by id" })
	async delete(@Param("id") id: string) {
		let entity = await this.artistService.delete(+id);
		return ArtistMapper.toResponse(entity);
	}
}
