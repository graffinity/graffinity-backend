import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTagDto } from './create-tag.dto';

export class UpdateTagDto extends PartialType(CreateTagDto) {
	@ApiProperty({
		type: Number,
		description: 'Id is a required value',
	})
	id: number;
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
