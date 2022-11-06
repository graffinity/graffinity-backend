import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateGraffitiPhotoDto } from "./dto/create-graffitiphoto.dto";
import { UpdateGraffitiPhotoDto } from "./dto/update-graffitiphoto.dto";

@Injectable()
export class GraffitiPhotoService {
	constructor(private prisma: PrismaService) {}

	async create(createGraffitiPhotoDto: CreateGraffitiPhotoDto) {
		return this.prisma.graffitiPhoto.create({ data: createGraffitiPhotoDto });
	}

	async findAll() {
		return this.prisma.graffitiPhoto.findMany();
	}

	async findOne(id: number) {
		return this.prisma.graffitiPhoto.findUnique({
			where: {
				id: id,
			},
		});
	}

	async update(id: number, updateGraffitiPhotoDto: UpdateGraffitiPhotoDto) {
		return this.prisma.graffitiPhoto.update({
			where: {
				id: id,
			},
			data: updateGraffitiPhotoDto,
		});
	}

	async remove(id: number) {
		return this.prisma.graffitiPhoto.delete({
			where: {
				id: id,
			},
		});
	}

	async findAllFilteredBy() {
		return this.prisma.graffitiPhoto.findMany({});
	}
}
