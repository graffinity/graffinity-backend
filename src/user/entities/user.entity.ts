import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Likes } from '@prisma/client';

export class UserEntity implements User {
	@ApiProperty({
		description: 'User id',
		example: 1,
		required: true,
	})
	id: number;

	@ApiProperty({
		description: 'User name',
		example: 'John',
		required: true,
	})
	name: string;

	@ApiProperty({
		description: 'User last name',
		example: 'Doe',
		required: true,
	})
	lastname: string;

	@ApiProperty({
		description: 'User name',
		example: 'admin',
		required: true,
	})
	username: string;

	@ApiProperty({
		description: "User's email",
		example: 'as.studentas@mif.stud.vu.lt',
		required: true,
	})
	email: string;

	@ApiProperty({
		description: "User's birth date",
		example: '1999-12-31',
		required: true,
	})
	password: string;

	@ApiProperty({
		description: "User's refresh token",
		example: 'some-refresh-token',
	})
	refreshToken: string;

	@ApiProperty()
	likes?: Likes[];
}
