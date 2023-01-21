import {
	Controller,
	Get,
	Post,
	Body,
	Put,
	Param,
	Delete,
	Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import UserMapper from './mapper/UserMapper';
import { LikesEntry } from './dto/request/likesEntry.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('api/v1/user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	async create(@Body() createUserDto: CreateUserDto) {
		let entity = await this.userService.create(createUserDto);
		return UserMapper.toResponse(entity);
	}

	// @Get()
	// async findAll() {
	// 	let entities = await this.userService.findAll();
	// 	return UserMapper.toResponses(entities);
	// }
	@Get(':id')
	async findById(@Param('id') id: string) {
		console.log(id);
		// if (isNaN(+id)) {
		// 	return null;
		// }
		let entity = await this.userService.findById(+id);

		if (entity !== null) {
			return UserMapper.toResponse(entity);
		}
		return null;
	}

	@Get('exist/:usernameOrEmail')
	async existsAlready(@Param('usernameOrEmail') usernameOrEmail?: string) {
		console.log('username', usernameOrEmail);

		return await this.userService.usernameOrEmailExists(usernameOrEmail);
	}

	@Put(':id')
	async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		let entity = await this.userService.update(+id, updateUserDto);
		return UserMapper.toResponse(entity);
	}

	@Put('/:id/likes/add')
	@ApiOperation({ summary: 'Update user likes by id' })
	async Likes(@Param('id') id: string, @Body() request: LikesEntry) {
		let entity = await this.userService.addLikedPhoto(+id, request);
		return UserMapper.toResponse(entity);
	}

	@Put('/:id/likes/remove')
	@ApiOperation({ summary: 'Update user likes by id' })
	async removeLikesFromUser(
		@Param('id') id: string,
		@Body() request: LikesEntry,
	) {
		let entity = await this.userService.removeLikedPhoto(+id, request);
		return UserMapper.toResponse(entity);
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		let entity = await this.userService.delete(+id);
		return UserMapper.toResponse(entity);
	}
}
