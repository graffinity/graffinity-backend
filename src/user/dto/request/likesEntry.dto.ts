import { ApiProperty } from '@nestjs/swagger';

export class LikesEntry {
	@ApiProperty()
	graffitiPhotoId: number[];
}
