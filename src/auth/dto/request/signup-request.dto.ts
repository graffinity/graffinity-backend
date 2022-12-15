import { ApiProperty } from '@nestjs/swagger';

export class SignUpRequest {
	@ApiProperty({
		description: 'The name of the user',
		example: 'John',
		required: true,
	})
	name: string;

	@ApiProperty({
		description: 'The lastname of the user',
		example: 'Doe',
		required: true,
	})
	lastname: string;

	@ApiProperty({
		description: 'The username of the user',
		example: 'admin',
		uniqueItems: true,
		required: true,
	})
	username: string;

	@ApiProperty({
		description: 'The email of the user',
		example: ' as.studentas.mif.vu.lt',
		uniqueItems: true,
		required: true,
	})
	email: string;

	@ApiProperty({
		description: 'The password of the user',
		example: 'password',
		required: true,
	})
	password: string;

	@ApiProperty({
		description: 'The date of birth of the user',
		example: '1999-12-31',
		required: false,
	})
	birthDate?: Date;
}
