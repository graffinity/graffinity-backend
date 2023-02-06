import { Injectable, NotFoundException } from '@nestjs/common';
import moment from 'moment';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/request/create-user.dto';
import { LikesEntry } from './dto/request/likesEntry.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { UserInfoResponse } from './dto/response/user-info-response.dto';
import { NotFoundError } from 'rxjs';
import { UserRoleService } from '../userrole/userrole.service';
import { RoleEnum } from '@prisma/client';

@Injectable()
export class UserService {
	constructor(
		private prisma: PrismaService,
		private userRoleService: UserRoleService,
	) {}

	async create(createUserDto: CreateUserDto) {
		let existsByEmail = await this.usernameOrEmailExists(createUserDto.email);
		let existsByUsername = await this.usernameOrEmailExists(
			createUserDto.username,
		);

		if (existsByEmail || existsByUsername) {
			throw new Error('User already exists');
		}
		let user = await this.prisma.user.create({
			data: {
				name: createUserDto.name,
				lastname: createUserDto.lastname,
				username: createUserDto.username,
				email: createUserDto.email,
				password: createUserDto.password,
			},
		});
		return user;
	}

	async findAll() {
		return await this.prisma.user.findMany();
	}

	async findById(id: number) {
		let user = await this.prisma.user.findUnique({
			where: {
				id: id,
			},
			include: {
				roles: true,
			},
		});

		if (!user) {
			throw new NotFoundException(`User #${id} not found`);
		}
		return user;
	}

	async isUserAdmin(userId: number) {
		let user = await this.prisma.user.findUnique({
			where: {
				id: userId,
			},
			include: {
				roles: true,
			},
		});

		if (!user) {
			throw new NotFoundException(`User #${userId} not found`);
		}

		let userroles = user.roles;

		if (userroles) {
			let allRoles = await this.userRoleService.findAll();
			let adminRoleId = allRoles.find(
				(role) => role.name === RoleEnum.ADMIN,
			)?.id;
			let isUserAdmin = userroles.find((role) => role.roleId === adminRoleId);
			if (isUserAdmin) {
				return true;
			}
		}
		return false;
	}

	async findByUsername(username: string) {
		return await this.prisma.user.findFirstOrThrow({
			where: {
				username: username,
			},
		});
	}

	async usernameOrEmailExists(usernameOrEmail?: string): Promise<boolean> {
		let res = await this.prisma.user.findFirst({
			where: {
				OR: [
					{
						username: usernameOrEmail,
					},
					{
						email: usernameOrEmail,
					},
				],
			},
		});

		if (res !== null && res !== undefined && res) {
			return true;
		}
		return false;
	}

	async findByEmail(email: string) {
		return await this.prisma.user.findFirstOrThrow({
			where: {
				email: email,
			},
		});
	}

	async update(id: number, updateUserDto: UpdateUserDto) {
		return await this.prisma.user.update({
			where: {
				id: id,
			},

			data: {
				name: updateUserDto.name,
				lastname: updateUserDto.lastname,
				username: updateUserDto.username,
				email: updateUserDto.email,
				password: updateUserDto.password,
				likes: {
					deleteMany: {},
					createMany: {
						data: updateUserDto.graffitiPhotoIds.map((graffitiPhotoId) => ({
							graffitiPhotoId: graffitiPhotoId,
						})),
					},
				},
			},
		});
	}

	async addLikedPhoto(id: number, request: LikesEntry) {
		let entity = await this.prisma.user.update({
			where: {
				id: id,
			},
			data: {
				likes: {
					create: request.graffitiPhotoId.map((graffitiPhotoId) => ({
						graffitiPhotoId: graffitiPhotoId,
					})),
				},
			},
		});
		return entity;
	}

	async removeLikedPhoto(id: number, request: LikesEntry) {
		let entity = await this.prisma.user.update({
			where: {
				id: id,
			},
			data: {
				likes: {
					deleteMany: request.graffitiPhotoId.map((graffitiPhotoId) => ({
						graffitiPhotoId: graffitiPhotoId,
					})),
				},
			},
		});
		return entity;
	}

	public async validRefreshToken(
		email: string,
		refreshToken: string,
	): Promise<UserInfoResponse | null> {
		const currentDate = moment().day(1).format('YYYY/MM/DD');
		let user = await this.prisma.user.findFirst({
			where: {
				email: email,
				refreshToken: refreshToken,
			},
		});

		if (!user) {
			return null;
		}

		let currentUser = new UserInfoResponse();
		currentUser.id = user.id;
		currentUser.name = user.name;
		currentUser.lastname = user.lastname;
		currentUser.email = user.email;
		currentUser.username = user.username;

		return currentUser;
	}

	async delete(id: number) {
		return await this.prisma.user.delete({
			where: {
				id: id,
			},
		});
	}
}
