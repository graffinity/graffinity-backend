import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";
import { GraffitiEntity } from "../../graffiti/entities/graffiti.entity";

export class UserEntity implements User {
	@ApiProperty()
	id: number;

	@ApiProperty()
	name: string;

	@ApiProperty()
	lastname: string;

	@ApiProperty()
	username: string;

	@ApiProperty()
	email: string;

	@ApiProperty()
	password: string;
}
