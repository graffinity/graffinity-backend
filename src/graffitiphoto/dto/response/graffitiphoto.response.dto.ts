import { ApiProperty } from '@nestjs/swagger';
import { Likes } from '@prisma/client';

export class GraffitiPhotoResponseDto {
	@ApiProperty({
		description: 'Id of graffiti photo',
		example: 1,
	})
	id: number;

	@ApiProperty({
		description: 'GraffitiId of graffiti photo',
		example: 1,
	})
	graffitiId: number;

	@ApiProperty({
		description: 'The url of a graffiti photo',
		example: 'https://www.amazon.s3.example.com/photo.jpg',
	})
	url: string;

	@ApiProperty({
		description: 'The userId of the user who uploaded the graffiti photo',
		example: 1,
	})
	userId: number;

	@ApiProperty({
		description: 'The given score of a graffiti photo',
		example: 1,
	})
	pictureScore: number | null;

	@ApiProperty({
		description: 'The date when the graffiti photo was added',
		example: '2021-01-01T00:00:00.000Z',
	})
	addedAt: Date;

	@ApiProperty({
		description: 'The likes of a graffiti photo',
		example: 1,
	})
	likes?: Likes[];
}
