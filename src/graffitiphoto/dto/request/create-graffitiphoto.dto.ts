import { ApiProperty } from '@nestjs/swagger';

export class CreateGraffitiPhotoDto {
	@ApiProperty({
		type: Number,
		description: 'GraffitiId is a required value',
	})
	graffitiId: number;

	@ApiProperty({
		type: Date,
		description:
			'The date of creation of a graffiti is provided as a timestamp and is required',
		default: new Date(),
	})
	addedAt: Date;
}
