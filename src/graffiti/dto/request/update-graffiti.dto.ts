import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateGraffitiDto } from './create-graffiti.dto';

export class UpdateGraffitiDto extends PartialType(CreateGraffitiDto) {
	@ApiProperty({
		type: Number,
		description: 'Id is a required value',
	})
	id: number;

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
		description: 'The latitude of a graffiti is a required value',
	})
	latitude: string;

	@ApiProperty({
		type: String,
		description: 'The longitude of a graffiti is a required value',
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
