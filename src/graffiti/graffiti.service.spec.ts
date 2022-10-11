import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "../prisma/prisma.service";
import { GraffitiService } from "./graffiti.service";

describe("GraffitiService", () => {
	let service: GraffitiService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [PrismaService, GraffitiService],
		}).compile();

		service = module.get<GraffitiService>(GraffitiService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
