import { ApiProperty } from '@nestjs/swagger';

export class UserInfoResponse {
	@ApiProperty()
	id: number;

	@ApiProperty()
	name: string;

	@ApiProperty()
	lastname: string;

	@ApiProperty()
	email: string;

	@ApiProperty()
	username: string;
}
