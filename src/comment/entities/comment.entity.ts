import { ApiProperty } from '@nestjs/swagger';
import { Comment } from '@prisma/client';

export class CommentEntity implements Comment {
	@ApiProperty()
	id: number;

	@ApiProperty()
	body: string;

	@ApiProperty()
	createdAt: Date;

	@ApiProperty()
	graffitiId: number;

	@ApiProperty()
	userId: number;
}
