import { ApiProperty } from '@nestjs/swagger';
import { iFile, IFile } from '../../../s3/S3service';

export class CreateGraffitiPhotoDto {
	@ApiProperty({
		type: Number,
		description: 'GraffitiId is a required value',
	})
	graffitiId: number;

	@ApiProperty({
		type: String,
		description: 'The url of a graffiti is a required value and must be unique',
	})
	url: string;

	@ApiProperty({
		type: Date,
		description:
			'The date of creation of a graffiti is provided as a timestamp and is required',
		default: new Date(),
	})
	addedAt: Date;

	@ApiProperty({
		type: iFile,
		description: 'The file of a graffiti is a required value',
	})
	file: IFile;

	@ApiProperty({
		type: Number,
		description: 'UserId is a required value',
	})
	userId: number;
}
