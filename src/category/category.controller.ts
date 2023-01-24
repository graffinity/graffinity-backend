import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/request/create-category.dto';
import { UpdateCategoryDto } from './dto/request/update-category.dto';
import CategoryMapper from './mapper/CategoryMapper';

@ApiTags('category')
@Controller('api/v1/category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Post()
	@ApiOperation({ summary: 'Create a category entity' })
	async create(@Body() createCategoryDto: CreateCategoryDto) {
		let entity = await this.categoryService.create(createCategoryDto);
		return CategoryMapper.toResponse(entity);
	}

	@Get()
	@ApiOperation({ summary: 'Find all categories' })
	async findAll() {
		let entities = await this.categoryService.findAll();
		return CategoryMapper.toResponses(entities);
	}

	@Get(':id')
	@ApiOperation({ summary: 'Find a category by id' })
	async findOne(@Param('id') id: number) {
		let entity = await this.categoryService.findOne(+id);
		if (entity) {
			return CategoryMapper.toResponse(entity);
		}
	}

	@Put(':id')
	@ApiOperation({ summary: 'Update a category entity by id' })
	async update(
		@Param('id') id: string,
		@Body() updateCategoryDto: UpdateCategoryDto,
	) {
		let entity = await this.categoryService.update(+id, updateCategoryDto);
		return CategoryMapper.toResponse(entity);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete a category by id' })
	async delete(@Param('id') id: string) {
		let entity = await this.categoryService.delete(+id);
		return CategoryMapper.toResponse(entity);
	}
}
