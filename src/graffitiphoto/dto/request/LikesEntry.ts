import { ApiProperty } from '@nestjs/swagger';

export class LikesEntry {
	@ApiProperty()
	userId: number[];
}
