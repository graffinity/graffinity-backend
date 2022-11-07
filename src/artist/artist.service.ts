import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateArtistDto } from "./dto/request/create-artist.dto";
import { UpdateArtistDto } from "./dto/request/update-artist.dto";

@Injectable()
export class ArtistService {
	constructor(private prisma: PrismaService) {}

	async create(createArtistDto: CreateArtistDto) {
		return await this.prisma.artist.create({ data: createArtistDto });
	}

	async findAll() {
		return await this.prisma.artist.findMany();
	}

	async findOne(id: number) {
		let entity = await this.prisma.artist.findUniqueOrThrow({
			where: {
				id: id,
			},
		});
		return entity;
	}

	async update(id: number, request: UpdateArtistDto) {
		return await this.prisma.artist.update({
			where: {
				id: id,
			},
			data: request,
		});
	}

	async delete(id: number) {
		return await this.prisma.artist.delete({
			where: {
				id: id,
      },
    });
	}
}
