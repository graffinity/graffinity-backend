import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { MetadataModule } from '../metadata/metadata.module';
import { MetadataService } from '../metadata/metadata.service';
import { MetadataServiceJS } from '../metadata/metadata.servicejs';
import { PrismaModule } from '../prisma/prisma.module';
import { S3Module } from '../s3/S3module';
import S3Service from '../s3/S3service';
import { UserModule } from '../user/user.module';
import { GraffitiPhotoController } from './graffitiphoto.controller';
import { GraffitiPhotoService } from './graffitiphoto.service';
import { UserService } from '../user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
	imports: [
		PrismaModule,
		S3Module,
		MetadataModule,
		AuthModule,
		UserModule,
		JwtModule,
	],
	controllers: [GraffitiPhotoController],
	providers: [
		GraffitiPhotoService,
		S3Service,
		MetadataService,
		MetadataServiceJS,
		AuthService,
		UserService,
		JwtService,
	],
})
export class GraffitiPhotoModule {}
