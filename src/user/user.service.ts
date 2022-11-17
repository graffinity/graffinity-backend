import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}
	private readonly users = [
		{
			userId: 1,
			username: 'john',
			password: 'changeme',
		},
		{
			userId: 2,
			username: 'maria',
			password: 'guess',
		},
	];
	create(createUserDto: CreateUserDto) {
		return this.prisma.user.create({ data: createUserDto });
	}

	findAll() {
		return `This action returns all user`;
	}

	findOne(id: number) {
		return `This action returns a #${id} user`;
	}

	findOneByUsername(username: string) {
		return this.prisma.user.findUnique({
			where: {
				username: username,
			},
		});
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`;
	}

	remove(id: number) {
		return `This action removes a #${id} user`;
	}
}
