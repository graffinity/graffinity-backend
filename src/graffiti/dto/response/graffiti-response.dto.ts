import { ApiProperty } from '@nestjs/swagger';
import { GraffitiPhotoResponseDto } from '../../../graffitiphoto/dto/response/graffitiphoto.response.dto';
import GraffitiStatus from '../../entities/graffiti-status.enum';

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
		description: 'The location of the graffiti post',
		example: 'geo: 52.520008, 13.404954',
	})
	location: string;

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
}
