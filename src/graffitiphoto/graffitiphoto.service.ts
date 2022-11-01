import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateGraffitiPhotoDto } from "./dto/create-graffitiphoto.dto";
import { UpdateGraffitiPhotoDto } from "./dto/update-graffitiphoto.dto";

@Injectable()
export class GraffitiPhotoService {
	constructor(private prisma: PrismaService) {}

	create(createGraffitiPhotoDto: CreateGraffitiPhotoDto) {
		return this.prisma.graffitiPhoto.create({ data: createGraffitiPhotoDto });
	}

	findAll() {
		return this.prisma.graffitiPhoto.findMany();
	}

	findOne(id: number) {
		return this.prisma.graffitiPhoto.findUnique({
			where: {
				id: id,
			},
		});
	}

	update(id: number, updateGraffitiPhotoDto: UpdateGraffitiPhotoDto) {
		return this.prisma.graffitiPhoto.update({
			where: {
				id: id,
			},
			data: updateGraffitiPhotoDto,
		});
	}

	remove(id: number) {
		return this.prisma.graffitiPhoto.delete({
			where: {
				id: id,
			},
		});
	}

	findAllFilteredBy() {
		return this.prisma.graffitiPhoto.findMany({});
	}
}
