import { Module } from '@nestjs/common';
import { GraffitiPhotoService } from './graffitiphoto.service';
import { GraffitiPhotoController } from './graffitiphoto.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { S3Module } from '../s3/S3module';
import S3Service from '../s3/S3service';
import { MetadataService } from '../metadata/metadata.service';
import { MetadataModule } from '../metadata/metadata.module';
import { MetadataServiceJS } from '../metadata/metadata.servicejs';

@Module({
	imports: [PrismaModule, S3Module, MetadataModule],
	controllers: [GraffitiPhotoController],
	providers: [
		GraffitiPhotoService,
		S3Service,
		MetadataService,
		MetadataServiceJS,
	],
})
export class GraffitiPhotoModule {}
