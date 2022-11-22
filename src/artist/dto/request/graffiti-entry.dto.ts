import { ApiProperty } from '@nestjs/swagger';

export class GraffitiEntry {
	@ApiProperty()
	graffitiIds: number[];
}
