import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './artist/artist.module';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { CategoryModule } from './category/category.module';
import { CommentModule } from './comment/comment.module';
import { EmailTemplateModule } from './email-template/email-template.module';
import { EmailModule } from './email/email.module';
import { FileController } from './file/file.controller';
import { FileService } from './file/file.service';
import { GraffitiModule } from './graffiti/graffiti.module';
import { GraffitiPhotoModule } from './graffitiphoto/graffitiphoto.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { ReportModule } from './report/report.module';
import { S3Module } from './s3/S3module';
import { TagModule } from './tag/tag.module';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { UserRoleModule } from './userrole/userrole.module';
import { UserRoleService } from './userrole/userrole.service';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: ['.env', '.env.test', '.env.dev', '.env.local'],
		}),
		AuthModule,
		EmailModule,
		EmailTemplateModule,
		TagModule,
		GraffitiModule,
		PrismaModule,
		CategoryModule,
		UserModule,
		AuthModule,
		JwtModule,
		GraffitiPhotoModule,
		ReportModule,
		ArtistModule,
		CommentModule,
		S3Module,
		UserRoleModule,
	],
	controllers: [AppController, FileController],
	providers: [
		{
			provide: 'APP_GUARD',
			useClass: JwtStrategy,
		},
		AppService,
		UserService,
		FileService,
		PrismaService,
		UserRoleService,
	],
	exports: [PrismaService, AppModule, ConfigModule],
})
export class AppModule {}
