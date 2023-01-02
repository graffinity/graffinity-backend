import { ApiProperty } from '@nestjs/swagger';

export class CreateGraffitiDto {
	@ApiProperty({
		type: String,
		description:
			'The name of a graffiti is a required value and must be unique',
	})
	name: string;

	@ApiProperty({
		type: String,
		description: 'The description of a graffiti is a required value',
	})
	description: string;

	@ApiProperty({
		type: String,
		description:
			'The latitude of a graffiti',
	})
	latitude: string;

	@ApiProperty({
		type: String,
		description:
			'The longitude of a graffiti',
	})
	longitude: string;

	@ApiProperty({
		type: Date,
		description:
			'The date of creation of a graffiti is provided as a timestamp and is required',
		default: new Date(),
	})
	createdAt: Date;

	@ApiProperty({
		type: Number,
		description: 'The authorId of a graffiti is a required value',
	})
	authorId: number;

	@ApiProperty({
		type: Array<Number>,
		description: 'Categories is an array of category ids',
	})
	categoryIds: number[];

	@ApiProperty({
		type: Array<Number>,
		description: 'Artists is an array of artist ids',
	})
	artistIds: number[];
}
