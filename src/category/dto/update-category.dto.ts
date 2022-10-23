import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { CreateCategoryDto } from "./create-category.dto";

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
	@ApiProperty({
		type: Number,
		description: "Id is a required value",
	})
	id: number;

	@ApiProperty({
		type: String,
		description: "Name is required and must be unique",
	})
	name: string;
}
