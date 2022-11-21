import { ApiProperty } from '@nestjs/swagger';

export class CreateArtistDto {
	@ApiProperty({
		type: String,
		description: 'Name is required and must be unique',
	})
	name: string;

	@ApiProperty({
		type: String,
		description: 'Surname is required and must be unique',
	})
	surname: string;

	@ApiProperty({
		type: Array<Number>,
		description: 'Graffitis is an array of graffiti ids',
	})
	graffitiIds: number[];
}
