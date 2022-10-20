import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateGraffitiDto } from "./dto/create-graffiti.dto";
import { UpdateGraffitiDto } from "./dto/update-graffiti.dto";
import { GraffitiService } from "./graffiti.service";

@ApiTags("graffiti")
@Controller("api/v1/graffiti")
export class GraffitiController {
	constructor(private readonly graffitiService: GraffitiService) {}

	@Post()
	@ApiOperation({ summary: "Create a graffiti post" })
	create(@Body() createGraffitiDto: CreateGraffitiDto) {
		return this.graffitiService.create(createGraffitiDto);
	}

	@Get()
	@ApiOperation({ summary: "Find all graffiti posts" })
	findAll() {
		return this.graffitiService.findAll();
	}

	@Get(":id")
	@ApiOperation({ summary: "Find a graffiti post by id" })
	findOne(@Param("id") id: string) {
		return this.graffitiService.findOne(+id);
	}

	@Patch(":id")
	@ApiOperation({ summary: "Update a graffiti post by id" })
	update(
		@Param("id") id: string,
		@Body() updateGraffitiDto: UpdateGraffitiDto,
	) {
		return this.graffitiService.update(+id, updateGraffitiDto);
	}

	@Delete(":id")
	@ApiOperation({ summary: "Delete a graffiti post by id" })
	remove(@Param("id") id: string) {
		return this.graffitiService.remove(+id);
	}
}
