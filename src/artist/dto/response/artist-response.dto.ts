import { ApiProperty } from "@nestjs/swagger";

export class ArtistResponseDto {
    @ApiProperty({
        description: "The id of an artist",
        example: 1,
    })
    id: number;

    @ApiProperty({
		description: "The name of an artist",
		example: "Name",
	})
	name: string;

    @ApiProperty({
		description: "The surname of an artist",
		example: "Surname",
	})
	surname: string;
}