import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CategoryModule } from "./category/category.module";
import { GraffitiModule } from "./graffiti/graffiti.module";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
	imports: [GraffitiModule, PrismaModule, CategoryModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
