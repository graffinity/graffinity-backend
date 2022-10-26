import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CategoryModule } from "./category/category.module";
import { GraffitiModule } from "./graffiti/graffiti.module";
import { PrismaModule } from "./prisma/prisma.module";
import { EmailModule } from './email/email.module';
import { EmailTemplateModule } from './email-template/email-template.module';
import { TagModule } from './tag/tag.module';

@Module({
	imports: [GraffitiModule, PrismaModule, CategoryModule, EmailModule, EmailTemplateModule, TagModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
