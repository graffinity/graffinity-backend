import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { MetadataModule } from '../metadata/metadata.module';
import { MetadataService } from '../metadata/metadata.service';
import { PrismaModule } from '../prisma/prisma.module';
import { S3Module } from '../s3/S3module';
import S3Service from '../s3/S3service';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { GraffitiPhotoController } from './graffitiphoto.controller';
import { GraffitiPhotoService } from './graffitiphoto.service';

@Module({
	imports: [
		PrismaModule,
		S3Module,
		MetadataModule,
		AuthModule,
		UserModule,
		JwtModule,
		MetadataModule,
	],
	controllers: [GraffitiPhotoController],
	providers: [
		GraffitiPhotoService,
		S3Service,
		MetadataService,
		AuthService,
		UserService,
		JwtService,
	],
})
export class GraffitiPhotoModule {}
