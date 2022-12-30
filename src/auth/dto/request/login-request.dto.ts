import { ApiProperty } from '@nestjs/swagger';

export class LoginRequest {
	// loginBy: LoginByUsername | LoginByEmail;
	username: string;

	@ApiProperty({
		description: 'The password of the user',
		example: 'password',
		required: true,
	})
	password: string;
}

export class LoginByUsername {
	@ApiProperty({
		description: 'The username of the user',
		example: 'admin',
	})
	username: string;
	email: never;
}

export class LoginByEmail {
	username: never;

	@ApiProperty({
		description: 'The email of the user',
		example: 'as.studentas.mif.stud.vu.lt',
	})
	email: string;
}
