import { ApiProperty } from '@nestjs/swagger';

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
		example: 'wwww.example.com',
	})
	url: string;

	@ApiProperty({
		description: 'The UserId of a graffirti photo',
		example: 1,
	})
	userId: number;
}
