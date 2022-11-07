import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ArtistService } from "./artist.service";
import { ArtistEntry } from "../graffiti/dto/request/artist-entry.dto";
import { GraffitiEntry } from "./dto/request/graffiti-entry.dto";
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

	@Patch(":id")
	@ApiOperation({ summary: "Update an artist entity by id" })
	update(@Param("id") id: string, @Body() updateArtistDto: UpdateArtistDto) {
		return this.artistService.update(+id, updateArtistDto);
	}

	@Delete(":id")
	@ApiOperation({ summary: "Delete an artist by id" })
	remove(@Param("id") id: string) {
		return this.artistService.remove(+id);
	}
}
