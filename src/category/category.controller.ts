import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Put,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@ApiTags("category")
@Controller("api/v1/category")
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Post()
	@ApiOperation({ summary: "Create a category entity" })
	create(@Body() createCategoryDto: CreateCategoryDto) {
		return this.categoryService.create(createCategoryDto);
	}

	@Get()
	@ApiOperation({ summary: "Find all categories" })
	findAll() {
		return this.categoryService.findAll();
	}

	@Get(":id")
	@ApiOperation({ summary: "Find a category by id" })
	findOne(@Param("id") id: string) {
		return this.categoryService.findOne(+id);
	}

	@Put(":id")
	@ApiOperation({ summary: "Update a category entity by id" })
	update(
		@Param("id") id: string,
		@Body() updateCategoryDto: UpdateCategoryDto,
	) {
		return this.categoryService.update(+id, updateCategoryDto);
	}

	@Delete(":id")
	@ApiOperation({ summary: "Delete a category by id" })
	delete(@Param("id") id: string) {
		return this.categoryService.delete(+id);
	}
}
