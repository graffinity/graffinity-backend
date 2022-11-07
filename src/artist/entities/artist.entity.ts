import { ApiProperty } from "@nestjs/swagger";
import { Artist, ArtistToGraffiti } from "@prisma/client";

export class ArtistEntity implements Artist {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    surname: string;

    @ApiProperty()
    graffitis?: ArtistToGraffiti[];
}
