import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";

@Injectable()
export class CommentService {
	constructor(private prisma: PrismaService) {}

	create(createCommentDto: CreateCommentDto) {
		return this.prisma.comment.create({ data: createCommentDto });
	}

	findAll() {
		return this.prisma.comment.findMany();
	}

	findOne(id: number) {
		return this.prisma.comment.findUnique({
			where: {
				id: id,
			},
		});
	}

	update(id: number, updateCommentDto: UpdateCommentDto) {
		return this.prisma.comment.update({
			where: {
				id: id,
			},
			data: updateCommentDto,
		});
	}

	remove(id: number) {
		return this.prisma.comment.delete({
			where: {
				id: id,
			},
		});
	}

	findAllFilteredBy() {
		return this.prisma.comment.findMany({});
	}
}