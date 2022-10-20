import { ApiProperty } from "@nestjs/swagger";

export class CreateGraffitiDto {
	@ApiProperty({
		type: String,
		description:
			"The name of a graffiti is a required value and must be unique",
	})
	name: string;

	@ApiProperty({
		type: String,
		description: "The description of a graffiti is a required value",
	})
	description: string;

	@ApiProperty({
		type: String,
		description:
			"The location of a graffiti can be described like: geo: Latitude, Longitude and is required",
	})
	location: string;

	@ApiProperty({
		type: Date,
		description:
			"The date of creation of a graffiti is provided as a timestamp and is required",
		default: new Date(),
	})
	createdAt: Date;
	// categories?: CategoryToGraffiti[];
	// tags?: TagToGraffiti[];
}
