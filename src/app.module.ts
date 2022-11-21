import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { GraffitiModule } from './graffiti/graffiti.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ArtistModule } from './artist/artist.module';
//import { CommentModule } from './comment/comment.module';
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
		ArtistModule,
		//CommentModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
