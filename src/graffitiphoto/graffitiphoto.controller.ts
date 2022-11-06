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
import { GraffitiPhotoService } from "./graffitiphoto.service";
import { CreateGraffitiPhotoDto } from "./dto/request/create-graffitiphoto.dto";
import { UpdateGraffitiPhotoDto } from "./dto/request/update-graffitiphoto.dto";

@ApiTags("graffitiphoto")
@Controller("api/v1/graffitiphoto")
export class GraffitiPhotoController {
	constructor(private readonly graffitiphotoService: GraffitiPhotoService) {}

	@Post()
	@ApiOperation({ summary: "Create a graffitiphoto entity" })
	create(@Body() createGraffitiPhotoDto: CreateGraffitiPhotoDto) {
		return this.graffitiphotoService.create(createGraffitiPhotoDto);
	}

	@Get()
	@ApiOperation({ summary: "Find all graffitiphoto" })
	findAll() {
		return this.graffitiphotoService.findAll();
	}

	@Get(":id")
	@ApiOperation({ summary: "Find a graffitiphoto by id" })
	findOne(@Param("id") id: string) {
		return this.graffitiphotoService.findOne(+id);
	}

	@Patch(":id")
	@ApiOperation({ summary: "Update a graffitiphoto entity by id" })
	update(
		@Param("id") id: string,
		@Body() updateGraffitiPhotoDto: UpdateGraffitiPhotoDto,
	) {
		return this.graffitiphotoService.update(+id, updateGraffitiPhotoDto);
	}

	@Delete(":id")
	@ApiOperation({ summary: "Delete a graffitiphoto by id" })
	remove(@Param("id") id: string) {
		return this.graffitiphotoService.remove(+id);
	}
}
