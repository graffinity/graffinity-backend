import { Module } from '@nestjs/common';
import { GraffitiService } from './graffiti.service';
import { GraffitiController } from './graffiti.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { GraffitiPhotoModule } from '../graffitiphoto/graffitiphoto.module';
import { GraffitiPhotoService } from '../graffitiphoto/graffitiphoto.service';
import { S3Module } from '../s3/S3module';
import S3Service from '../s3/S3service';
import { MetadataModule } from '../metadata/metadata.module';
import { MetadataService } from '../metadata/metadata.service';
import { MetadataServiceJS } from '../metadata/metadata.servicejs';

@Module({
	imports: [PrismaModule, GraffitiPhotoModule, S3Module],
	controllers: [GraffitiController],
	providers: [
		GraffitiService,
		GraffitiPhotoService,
		S3Service,
		MetadataService,
		MetadataServiceJS,
	],
})
export class GraffitiModule {}
