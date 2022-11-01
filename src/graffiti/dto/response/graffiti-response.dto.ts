import { ApiProperty } from "@nestjs/swagger";

export class GraffitiResponseDto {
	@ApiProperty({
		description: "The id of the graffiti post",
		example: 1,
	})
	id: number;

	@ApiProperty({
		description: "The name of the graffiti post",
		example: "Graffiti 1",
	})
	name: string;

	@ApiProperty({
		description: "The description of the graffiti post",
		example: "This is a graffiti post",
	})
	description: string;

	@ApiProperty({
		description: "The location of the graffiti post",
		example: "geo: 52.520008, 13.404954",
	})
	location: string;

	@ApiProperty({
		description: "The author id of the graffiti post",
		example: 1,
	})
	authorId: number;
}
