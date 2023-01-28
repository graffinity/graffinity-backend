import { Module } from '@nestjs/common';
import { GraffitiPhotoModule } from '../graffitiphoto/graffitiphoto.module';
import { GraffitiPhotoService } from '../graffitiphoto/graffitiphoto.service';
import { MetadataModule } from '../metadata/metadata.module';
import { MetadataService } from '../metadata/metadata.service';
import { S3Module } from '../s3/S3module';
import S3Service from '../s3/S3service';
import { GraffitiController } from './graffiti.controller';
import { GraffitiService } from './graffiti.service';

@Module({
	imports: [GraffitiPhotoModule, S3Module, MetadataModule],
	controllers: [GraffitiController],
	providers: [
		GraffitiService,
		GraffitiPhotoService,
		S3Service,
		MetadataService,
	],
})
export class GraffitiModule {}
