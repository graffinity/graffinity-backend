import { Email } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class EmailEntity implements Email {
	@ApiProperty()
	id: number;

	@ApiProperty()
	dateSent: Date;

	@ApiProperty()
	subject: string;

	@ApiProperty()
	body: string;

	@ApiProperty()
	status: string;
}
