import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentDto {
    @ApiProperty({
        type: String,
        description: "The body of a comment is a required value and must be unique",  
    })
    body: string;
}
