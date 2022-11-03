import { ApiProperty } from "@nestjs/swagger";

export class CommentResponseDto {
    @ApiProperty({
		type: Number,
		description: "Id is a required value",
	})
	id: number;

    @ApiProperty({
		type: String,
		description: "The body of a comment is a required value",
	})
	body: string;

    @ApiProperty({
        type: Number,
        description: "The userId of a created comment is a required value",
    })
    userId: number;

    @ApiProperty({
        type: Number, 
        description: "The graffitiId of a created comment is a required value",
    })
    graffitiId: number;
}