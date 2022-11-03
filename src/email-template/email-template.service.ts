import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmailTemplateDto } from './dto/request/create-email-template.dto';
import { UpdateEmailTemplateDto } from './dto/request/update-email-template.dto';

@Injectable()
export class EmailTemplateService {
	constructor(private prisma: PrismaService) {}

	async create(createEmailTemplateDto: CreateEmailTemplateDto) {
		return await this.prisma.emailTemplate.create({
			data: createEmailTemplateDto,
		});
	}

	async findAll() {
		return await this.prisma.emailTemplate.findMany();
	}

	async findOne(id: number) {
		let entity = await this.prisma.emailTemplate.findUniqueOrThrow({
			where: {
				id: id,
			},
		});
		return entity;
	}

	async update(id: number, updateEmailTemplateDto: UpdateEmailTemplateDto) {
		return await this.prisma.emailTemplate.update({
			where: {
				id: id,
			},
			data: updateEmailTemplateDto,
		});
	}

	async delete(id: number) {
		return await this.prisma.emailTemplate.delete({
			where: {
				id: id,
			},
		});
	}
	findAllFilteredBy() {
		return this.prisma.emailTemplate.findMany({});
	}
}
