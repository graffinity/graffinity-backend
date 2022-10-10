import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from "@nestjs/common";
import { GraffitiService } from "./graffiti.service";
import { CreateGraffitiDto } from "./dto/create-graffiti.dto";
import { UpdateGraffitiDto } from "./dto/update-graffiti.dto";

@Controller("api/v1/graffiti")
export class GraffitiController {
	constructor(private readonly graffitiService: GraffitiService) {}

	@Post()
	create(@Body() createGraffitiDto: CreateGraffitiDto) {
		return this.graffitiService.create(createGraffitiDto);
	}

	@Get()
	findAll() {
		return this.graffitiService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.graffitiService.findOne(+id);
	}

	@Patch(":id")
	update(
		@Param("id") id: string,
		@Body() updateGraffitiDto: UpdateGraffitiDto,
	) {
		return this.graffitiService.update(+id, updateGraffitiDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.graffitiService.remove(+id);
	}
}
