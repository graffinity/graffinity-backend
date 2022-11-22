import { ApiProperty } from '@nestjs/swagger';

export class CategoryEntry {
	@ApiProperty()
	categoryIds: number[];
}
