import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagService {
	constructor(private prisma: PrismaService) {}

	create(createTagDto: CreateTagDto) {
		return this.prisma.tag.create({ data: createTagDto });
	}

	findAll() {
		return this.prisma.tag.findMany();
	}

	findOne(id: number) {
		return this.prisma.tag.findUnique({
			where: {
				id: id,
			},
		});
	}

	update(id: number, updateTagDto: UpdateTagDto) {
		return this.prisma.tag.update({
			where: {
				id: id,
			},
			data: updateTagDto,
		});
	}

	remove(id: number) {
		return this.prisma.tag.delete({
			where: {
				id: id,
			},
		});
	}
	findAllFilteredBy() {
		return this.prisma.tag.findMany({});
	}
}
