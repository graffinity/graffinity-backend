import { ApiProperty } from '@nestjs/swagger';
import { Graffiti, GraffitiPhoto, Likes } from '@prisma/client';

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
	pictureScore: number | null;

	@ApiProperty()
	comment?: string;

	@ApiProperty()
	likes?: Likes[];
}

