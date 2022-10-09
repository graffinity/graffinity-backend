import { Test, TestingModule } from "@nestjs/testing";
import { GraffitiController } from "./graffiti.controller";
import { GraffitiService } from "./graffiti.service";

describe("GraffitiController", () => {
	let controller: GraffitiController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [GraffitiController],
			providers: [GraffitiService],
		}).compile();

		controller = module.get<GraffitiController>(GraffitiController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
