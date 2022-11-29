import { ApiProperty } from '@nestjs/swagger';
import { GraffitiPhoto } from '@prisma/client';

export class GraffitiPhotoEntity implements GraffitiPhoto {
	@ApiProperty()
	id: number;

	@ApiProperty()
	graffitiId: number;

	@ApiProperty()
	url: string;

	@ApiProperty()
	addedAt: Date;

	@ApiProperty()
	userId: number;

	@ApiProperty()
	comment?: string;
}
//cia kazkas netaip turbut
