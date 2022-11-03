import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateCommentDto } from "./dto/request/create-comment.dto";

@Injectable()
export class CommentService {
	constructor(private prisma: PrismaService) {}

	async create(createCommentDto: CreateCommentDto) {
		return await this.prisma.comment.create({data: createCommentDto});
	}

	async findAll() {
		return await this.prisma.comment.findMany();
	}

	async delete(id: number) {
		return await this.prisma.comment.delete({
			where: {
				id: id,
			},
		});
	}
}