import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CategoryModule } from "./category/category.module";
import { GraffitiModule } from "./graffiti/graffiti.module";
import { PrismaModule } from "./prisma/prisma.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { JwtModule } from "@nestjs/jwt";
import { UserService } from "./user/user.service";
import { EmailTemplateModule } from './email-template/email-template.module';
import { TagModule } from './tag/tag.module';
import { EmailModule } from './email/email.module';

@Module({
	imports: [
		EmailModule,
		EmailTemplateModule,
		TagModule,
		GraffitiModule,
		PrismaModule,
		CategoryModule,
		UserModule,
		AuthModule,
		JwtModule,
	],
	controllers: [AppController],
	providers: [AppService, UserService],
})
export class AppModule {}
