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
}
