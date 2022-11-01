import { ApiProperty } from "@nestjs/swagger";

export class CreateGraffitiPhotoDto {
	@ApiProperty({
		type: Number,
		description: "Id is a required value",
	})
	id: number;

	@ApiProperty({
		type: Number,
		description: "GraffitiId is a required value",
	})
	graffitiId: number;

	@ApiProperty({
		type: String,
		description:
			"The url of a graffiti is a required value and must be unique",
	})
	url: string;

	@ApiProperty({
		type: Date,
		description:
			"The date of creation of a graffiti is provided as a timestamp and is required",
		default: new Date(),
	})
	addedAt: Date;

}