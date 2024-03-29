import { ApiProperty } from '@nestjs/swagger';
import { GraffitiPhotoResponseDto } from '../../../graffitiphoto/dto/response/graffitiphoto.response.dto';
import { GraffitiStatus } from '@prisma/client';

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
		description: 'The latitude of a graffiti',
		example: '52.520008',
	})
	latitude: string;

	@ApiProperty({
		type: String,
		description: 'The longitude of a graffiti',
		example: '13.404954',
	})
	longitude: string;

	@ApiProperty({
		type: String,

		description: 'The address of a graffiti',
		example: 'Berlin, Germany',
	})
	address: string | null;

	@ApiProperty({
		type: GraffitiStatus,
		description: 'The status of the graffiti post submission',
		example: 'PENDING',
	})
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

	@ApiProperty({
		description: 'The photos of the graffiti post',
		example: [
			{
				id: 1,
				url: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
				createdAt: '2021-05-01T00:00:00.000Z',
				graffitiId: 1,
			},
		],
	})
	photos: GraffitiPhotoResponseDto[];

	@ApiProperty({
		description: 'The distance of the graffiti post from the user in meters',
		required: false,
		example: 150,
	})
	distance?: number;
}
