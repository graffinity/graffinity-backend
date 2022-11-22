import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmailEntity } from './entities/email.entity';

@Injectable()
export class EmailService {
	constructor(private prisma: PrismaService) {}

	create(createEmailEntity: EmailEntity) {
		return this.prisma.email.create({ data: createEmailEntity });
	}

	findAll() {
		return this.prisma.email.findMany();
	}

	findOne(id: number) {
		return this.prisma.email.findUnique({
			where: {
				id: id,
			},
		});
	}

	remove(id: number) {
		return this.prisma.email.delete({
			where: {
				id: id,
			},
		});
	}
	findAllFilteredBy() {
		return this.prisma.email.findMany({});
	}
}
