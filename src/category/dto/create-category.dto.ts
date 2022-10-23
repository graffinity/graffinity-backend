import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
	@ApiProperty({
		type: String,
		description: "Name is required and must be unique",
	})
	name: string;
}
