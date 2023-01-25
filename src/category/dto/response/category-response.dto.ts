import { ApiProperty } from '@nestjs/swagger';

export class CategoryResponseDto {
	@ApiProperty({
		description: 'The id of the category',
		example: 1,
	})
	id: number;

	@ApiProperty({
		description: 'The name of the category',
		example: 'Category 1',
	})
	name: string;
}
