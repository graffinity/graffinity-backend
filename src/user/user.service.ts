import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async create(createUserDto: CreateUserDto) {
		return this.prisma.user.create({ data: createUserDto });
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
			data: updateUserDto,
		});
	}

	async delete(id: number) {
		return await this.prisma.user.delete({
			where: {
				id: id,
			},
		});
	}
}
