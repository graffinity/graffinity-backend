import { Graffiti } from "@prisma/client";
import { CategoryEntity } from "../../category/entities/category.entity";

export class GraffitiEntity implements Graffiti {
	id: number;
	name: string;
	description: string;
	location: string;
	createdAt: Date;
	categories?: CategoryEntity[];
}
