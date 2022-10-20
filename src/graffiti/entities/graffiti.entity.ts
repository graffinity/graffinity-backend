import { ApiProperty } from "@nestjs/swagger";
import { Graffiti } from "@prisma/client";
import { CategoryEntity } from "../../category/entities/category.entity";

export class GraffitiEntity implements Graffiti {
	@ApiProperty()
	id: number;

	@ApiProperty()
	name: string;

	@ApiProperty()
	description: string;

	@ApiProperty()
	location: string;

	@ApiProperty()
	createdAt: Date;

	@ApiProperty()
	categories?: CategoryEntity[];
}
