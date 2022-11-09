import { ApiProperty } from '@nestjs/swagger';

export class EmailTemplateResponseDto {
	@ApiProperty({
		description: 'Id is a required value',
		example: 1,
	})
	id: number;

	@ApiProperty({
		description: 'The name of the email tamplate',
		example: 'Password change tamplate',
	})
	name: string;

	@ApiProperty({
		description: 'The subject of email template',
		example: 'This is a subject of email tamplate ',
	})
	subject: string;

	@ApiProperty({
		description: 'The body of email template',
		example: 'This is a body of a email-tamplate',
	})
	body: string;
}
