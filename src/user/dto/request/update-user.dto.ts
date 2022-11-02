import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) {
	@ApiProperty({
		description: "The id of the user",
		example: "1",
	})
	id: number;

	@ApiProperty({
		description: "The name of the user",
		example: "John",
	})
	name: string;

	@ApiProperty({
		description: "The lastname of the user",
		example: "Doe",
	})
	lastname: string;

	@ApiProperty({
		description: "The username of the user",
		example: "johndoe",
	})
	username: string;

	@ApiProperty({
		description: "The email of the user",
		example: "johndoe@gmail.com",
	})
	email: string;

	@ApiProperty({
		description: "The password of the user",
		example: "123456",
	})
	password: string;
}
