import {
	Controller,
	Get,
	Post,
	Body,
	Put,
	Param,
	Delete,
	Query,
	UseGuards,
	UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import UserMapper from './mapper/UserMapper';
import { LikesEntry } from './dto/request/likesEntry.dto';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import GetCurrentUserId from '../auth/decorators/get-current-user-id.decorator';
import Public from '../auth/decorators/public.decorator';

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
		let entity = await this.userService.findById(+id);
		return UserMapper.toResponse(entity);
	}

	@Public()
	@Get('exist/:usernameOrEmail')
	async existsAlready(@Param('usernameOrEmail') usernameOrEmail?: string) {
		return await this.userService.usernameOrEmailExists(usernameOrEmail);
	}

	@Put(':id')
	@UseGuards(JwtAuthGuard)
	async update(
		@Param('id') id: string,
		@Body() updateUserDto: UpdateUserDto,
		@GetCurrentUserId() userId: number,
	) {
		if (+id !== userId) {
			throw new UnauthorizedException(
				'You are not authorized to update this user',
			);
		}
		let entity = await this.userService.update(+id, updateUserDto);
		return UserMapper.toResponse(entity);
	}

	// remove this later?
	@Put('/:id/likes/add')
	@ApiOperation({ summary: 'Update user likes by id' })
	async Likes(@Param('id') id: string, @Body() request: LikesEntry) {
		let entity = await this.userService.addLikedPhoto(+id, request);
		return UserMapper.toResponse(entity);
	}

	// remove this later?
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
	@UseGuards(JwtAuthGuard)
	async delete(@Param('id') id: string, @GetCurrentUserId() userId: number) {
		if (+id !== userId) {
			throw new UnauthorizedException(
				'You are not authorized to delete this user',
			);
		}
		let entity = await this.userService.delete(+id);
		return UserMapper.toResponse(entity);
	}
}
