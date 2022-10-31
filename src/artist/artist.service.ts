import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateArtistDto } from "./dto/create-artist.dto";
import { UpdateArtistDto } from "./dto/update-artist.dto";

@Injectable()
export class ArtistService {
	constructor(private prisma: PrismaService) {}

	create(createArtistDto: CreateArtistDto) {
		return this.prisma.artist.create({ data: createArtistDto });
	}

	findAll() {
		return this.prisma.artist.findMany();
	}

	findOne(id: number) {
		return this.prisma.artist.findUnique({
			where: {
				id: id,
			},
		});
	}

	update(id: number, updateArtistDto: UpdateArtistDto) {
		return this.prisma.artist.update({
			where: {
				id: id,
			},
			data: updateArtistDto,
		});
	}

	remove(id: number) {
		return this.prisma.artist.delete({
      where: {
        id: id,
      },
    })
	}

	findAllFilteredBy() {
		return this.prisma.artist.findMany({});
	}
}
