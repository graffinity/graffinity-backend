import { ApiProperty } from "@nestjs/swagger";
import { Artist } from "@prisma/client";

export class ArtistEntity implements Artist {
    @ApiProperty()
    id: number

    @ApiProperty()
    name: string

    @ApiProperty()
    surname: string
}
