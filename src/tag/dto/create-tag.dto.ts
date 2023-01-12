import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {
	@ApiProperty({
		type: String,
		description: 'Name has to be unique',
	})
	name: string;
	@ApiProperty({
		type: String,
		description: 'Tags description',
	})
	description: string;
}
