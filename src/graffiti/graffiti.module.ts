import { Module } from "@nestjs/common";
import { GraffitiService } from "./graffiti.service";
import { GraffitiController } from "./graffiti.controller";

@Module({
	controllers: [GraffitiController],
	providers: [GraffitiService],
})
export class GraffitiModule {}
