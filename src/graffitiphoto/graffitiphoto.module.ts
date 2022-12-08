import { Module } from '@nestjs/common';
import { GraffitiPhotoService } from './graffitiphoto.service';
import { GraffitiPhotoController } from './graffitiphoto.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { S3Module } from '../s3/S3module';
import S3Service from '../s3/S3service';

@Module({
	imports: [PrismaModule, S3Module],
	controllers: [GraffitiPhotoController],
	providers: [GraffitiPhotoService, S3Service],
})
export class GraffitiPhotoModule {}
