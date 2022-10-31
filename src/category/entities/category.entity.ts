import { ApiProperty } from "@nestjs/swagger";
import { Category, CategoryToGraffiti } from "@prisma/client";

export class CategoryEntity implements Category {
	@ApiProperty()
	id: number;

	@ApiProperty()
	name: string;

	@ApiProperty()
	graffitis: CategoryToGraffiti[]
}
