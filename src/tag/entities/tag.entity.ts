import { Tag } from "@prisma/client";
import { GraffitiEntity } from "../../graffiti/entities/graffiti.entity";

export class TagEntity implements Tag {
	id: number;
	name: string;
	description: string;
	graffitis?: GraffitiEntity[];
}
