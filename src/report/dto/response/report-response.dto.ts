import { ApiProperty } from '@nestjs/swagger';

export class ReportResponseDto {
	@ApiProperty({
		description: 'Id of the report',
		example: 1,
	})
	id: number;

	@ApiProperty({
		description: 'The graffitiId of the report',
		example: 1,
	})
	graffitiId: number;

	@ApiProperty({
		description: 'The userId of the report',
		example: 1,
	})
	userId: number;

	@ApiProperty({
		description: 'The reportReason of the report',
		example: 'Painted over',
	})
	reportReason: string;

	@ApiProperty({
		description: 'Awaiting review',
	})
	status: string;
}
