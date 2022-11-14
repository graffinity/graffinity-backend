import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateEmailTemplateDto } from './create-email-template.dto';

export class UpdateEmailTemplateDto extends PartialType(
	CreateEmailTemplateDto,
) {
	@ApiProperty({
		type: String,
		description: 'What kind of type email will be',
	})
	name: string;
	@ApiProperty({
		type: Number,
		description: 'Id is a required value',
	})
	id: number;
	@ApiProperty({
		type: String,
		description: 'Subject is a idk what value',
	})
	subject: string;
	@ApiProperty({
		type: String,
		description: 'What kind of type email will be',
	})
	body: string;
}
