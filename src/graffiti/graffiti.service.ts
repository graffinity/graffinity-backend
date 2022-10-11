import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateGraffitiDto } from "./dto/create-graffiti.dto";
import { UpdateGraffitiDto } from "./dto/update-graffiti.dto";

@Injectable()
export class GraffitiService {
	constructor(private prisma: PrismaService) {}

	create(createGraffitiDto: CreateGraffitiDto) {
		return this.prisma.graffiti.create({ data: createGraffitiDto });
	}

	findAll() {
		return this.prisma.graffiti.findMany();
	}

	findOne(id: number) {
		return this.prisma.graffiti.findUnique({
			where: {
				id: id,
			},
		});
	}

	update(id: number, updateGraffitiDto: UpdateGraffitiDto) {
		return this.prisma.graffiti.update({
			where: {
				id: id,
			},
			data: updateGraffitiDto,
		});
	}

	remove(id: number) {
		return this.prisma.graffiti.delete({
			where: {
				id: id,
			},
		});
	}
}
