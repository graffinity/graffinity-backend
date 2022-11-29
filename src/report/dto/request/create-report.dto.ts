import { ApiProperty } from '@nestjs/swagger';

export class CreateReportDto {
	@ApiProperty({
		type: Number,
		description: 'The graffitiId of a report is a required value',
	})
	graffitiId: number;

	@ApiProperty({
		type: Number,
		description: 'The userId of a report is a required value',
	})
	userId: number;

	@ApiProperty({
		type: Date,
		description:
			'The date of creation of a report is provided as a timestamp and is required',
		default: new Date(),
	})
	createdAt: Date;

	@ApiProperty({
		type: String,
		description: 'The reportReason is a required value',
	})
	reportReason: string;

	@ApiProperty({
		type: String,
		description: 'The status of a report is a required value',
	})
	status: string;
}
