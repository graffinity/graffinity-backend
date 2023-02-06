import { Injectable } from '@nestjs/common';
import { RoleEnum } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserRoleService {
	constructor(private prisma: PrismaService) {}

	async findAll() {
		return await this.prisma.role.findMany();
	}

	async findById(id: number) {
		return await this.prisma.role.findUnique({
			where: {
				id: id,
			},
		});
	}

	async findByName(name: string) {
		if (name === 'USER') {
			return await this.prisma.role.findUnique({
				where: {
					name: RoleEnum.USER,
				},
			});
		} else if (name === 'ADMIN') {
			return await this.prisma.role.findUnique({
				where: {
					name: name,
				},
			});
		}
		return null;
	}
}
