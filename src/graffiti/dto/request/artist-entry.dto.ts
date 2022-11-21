import { ApiProperty } from '@nestjs/swagger';

export class ArtistEntry {
	@ApiProperty()
	artistIds: number[];
}
