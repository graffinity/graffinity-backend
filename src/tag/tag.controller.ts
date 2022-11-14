import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('tag')
@Controller('api/v1/graffiti')
export class TagController {
	constructor(private readonly tagService: TagService) {}

	@Post()
	@ApiOperation({ summary: 'Tag Creation' })
	create(@Body() createTagDto: CreateTagDto) {
		return this.tagService.create(createTagDto);
	}

	@Get()
	@ApiOperation({ summary: 'find all tags' })
	findAll() {
		return this.tagService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'find a tag by id' })
	findOne(@Param('id') id: string) {
		return this.tagService.findOne(+id);
	}

	@Patch(':id')
	@ApiOperation({ summary: 'Update tag by its id' })
	update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
		return this.tagService.update(+id, updateTagDto);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'remove tag by its id' })
	remove(@Param('id') id: string) {
		return this.tagService.remove(+id);
	}
}
