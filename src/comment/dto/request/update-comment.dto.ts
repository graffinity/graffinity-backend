import { PartialType } from '@nestjs/swagger';
import { ApiProperty } from "@nestjs/swagger";
import { CreateCommentDto } from './create-comment.dto';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
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
        type: Date,
        description: "The date of the creation of a graffiti is provided as a timestamp and is required",
        default: new Date(),
    })
    createdAt: Date;

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
