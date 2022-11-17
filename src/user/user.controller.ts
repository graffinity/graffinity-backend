import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/request/create-user.dto";
import { UpdateUserDto } from "./dto/request/update-user.dto";
import UserMapper from "./mapper/UserMapper";

@Controller('api/v1/user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto);
	}

	@Get()
	findAll() {
		return this.userService.findAll();
	}

	@Get(":id")
	async findById(@Param("id") id: string) {
		let entity = await this.userService.findById(+id);

		if (entity !== null) {
			return UserMapper.toResponse(entity);
		}
		return null;
	}

	@Patch(":id")
	async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
		let entity = await this.userService.update(+id, updateUserDto);
		return UserMapper.toResponse(entity);
	}

	@Delete(":id")
	async delete(@Param("id") id: string) {
		let entity = await this.userService.delete(+id);
		return UserMapper.toResponse(entity);
	}
}
