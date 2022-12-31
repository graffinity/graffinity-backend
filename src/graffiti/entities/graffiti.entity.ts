import { ApiProperty } from '@nestjs/swagger';
import { ArtistToGraffiti, CategoryToGraffiti, Graffiti } from '@prisma/client';
import { GraffitiPhoto } from '@prisma/client';

export class GraffitiEntity implements Graffiti {
	@ApiProperty()
	id: number;

	@ApiProperty()
	name: string;

	@ApiProperty()
	description: string;

	@ApiProperty()
	location: string;

	@ApiProperty()
	createdAt: Date;

	@ApiProperty()
	authorId: number;

	@ApiProperty()
	photos: GraffitiPhoto[];

	@ApiProperty()
	categories?: CategoryToGraffiti[];

	@ApiProperty()
	artists?: ArtistToGraffiti[];
}
