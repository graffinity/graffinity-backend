import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/request/create-user.dto';
import { LikesEntry } from './dto/request/likesEntry.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async create(createUserDto: CreateUserDto) {
		return await this.prisma.user.create({ data: createUserDto });
	}

	async findAll() {
		return await this.prisma.user.findMany();
	}

	async findById(id: number) {
		return await this.prisma.user.findUnique({
			where: {
				id: id,
			},
		});
	}

	async findByUsername(username: string) {
		return await this.prisma.user.findFirstOrThrow({
			where: {
				username: username,
			},
		});
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
				...updateUserDto,
				likes: {
					create: updateUserDto.graffitiPhotoIds.map((graffitiPhotoId) => ({
						graffitiPhotoId: graffitiPhotoId,
					})),
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
		console.log(entity);
		return entity;
	}

	async removeLikedPhoto(id: number, request: LikesEntry) {
		let entity = await this.prisma.user.update({
			where: {
				id: id,
			},
			data: {
				likes: {
					delete: request.graffitiPhotoId.map((graffitiPhotoId) => ({
						id: graffitiPhotoId,
					})),
				},
			},
		});
		console.log(entity);
		return entity;
	}

	async delete(id: number) {
		return await this.prisma.user.delete({
			where: {
				id: id,
			},
		});
	}
}
