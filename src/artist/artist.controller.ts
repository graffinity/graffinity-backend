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
import { CreateArtistDto } from "./dto/create-artist.dto";
import { UpdateArtistDto } from "./dto/update-artist.dto";

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
	findAll() {
		return this.artistService.findAll();
	}

	@Get(":id")
	@ApiOperation({ summary: "Find an artist by id" })
	findOne(@Param("id") id: string) {
		return this.artistService.findOne(+id);
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
