import { ApiProperty } from '@nestjs/swagger';

export class GraffitiResponseDto {
	@ApiProperty({
		description: 'The id of the graffiti post',
		example: 1,
	})
	id: number;

	@ApiProperty({
		description: 'The name of the graffiti post',
		example: 'Graffiti 1',
	})
	name: string;

	@ApiProperty({
		description: 'The description of the graffiti post',
		example: 'This is a graffiti post',
	})
	description: string;


	@ApiProperty({
		type: String,
		description:
			'The latitude of a graffiti',
			example: '52.520008',
	})
	latitude: string;

	@ApiProperty({
		type: String,
		description:
			'The longitude of a graffiti',
			example: '13.404954',
	})
	longitude: string;


	@ApiProperty({
		description: 'The author id of the graffiti post',
		example: 1,
	})
	authorId: number;

	@ApiProperty({
		description: 'Entity creation date timestamp',
		example: '2021-05-01T00:00:00.000Z',
	})
	creationDate: Date;
}
