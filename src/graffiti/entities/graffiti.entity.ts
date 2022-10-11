import { Graffiti } from "@prisma/client";

export class GraffitiEntity implements Graffiti {
	id: number;
	name: string;
	description: string;
	location: string;
	createdAt: Date;
}
