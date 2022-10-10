import { Module } from "@nestjs/common";
import { GraffitiService } from "./graffiti.service";
import { GraffitiController } from "./graffiti.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
	imports: [PrismaModule],
	controllers: [GraffitiController],
	providers: [GraffitiService],
})
export class GraffitiModule {}
