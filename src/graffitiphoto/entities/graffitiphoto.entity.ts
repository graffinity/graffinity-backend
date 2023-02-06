import { ApiProperty } from '@nestjs/swagger';
import { GraffitiPhoto, Likes } from '@prisma/client';

export class GraffitiPhotoEntity implements GraffitiPhoto {
	@ApiProperty()
	id: number;

	@ApiProperty()
	graffitiId: number;

	@ApiProperty()
	url: string;

	@ApiProperty()
	createdAt: Date;

	@ApiProperty()
	userId: number;

	@ApiProperty()
	pictureScore: number | null;

	@ApiProperty()
	comment?: string;

	@ApiProperty()
	likes?: Likes[];
}
