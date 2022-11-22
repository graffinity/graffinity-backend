import { ApiProperty } from '@nestjs/swagger';

export class GraffitiEntry {
	@ApiProperty()
	graffitiId: number;
}
