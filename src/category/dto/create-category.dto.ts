import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
	@ApiProperty({
		type: String,
		description: 'Name is required and must be unique',
	})
	name: string;

	@ApiProperty({
		type: Array<Number>,
		description: 'Posts is an array of graffiti ids',
	})
	graffitiIds: number[];
}
