import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReportDto } from './dto/request/create-report.dto';
import { UpdateReportDto } from './dto/request/update-report.dto';

@Injectable()
export class ReportService {
	constructor(private prisma: PrismaService) {}

	async create(createReportDto: CreateReportDto) {
		return await this.prisma.report.create({ data: createReportDto });
	}

	async findAll() {
		return await this.prisma.report.findMany();
	}

	async findOne(id: number) {
		let entity = await this.prisma.report.findUniqueOrThrow({
			where: {
				id: id,
			},
		});
		return entity;
	}

	async update(id: number, request: UpdateReportDto) {
		return await this.prisma.report.update({
			where: {
				id: id,
			},
			data: request,
		});
	}

	async delete(id: number) {
		return await this.prisma.report.delete({
			where: {
				id: id,
			},
		});
	}
}
