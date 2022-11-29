import { Module } from '@nestjs/common';
import { GraffitiPhotoService } from './graffitiphoto.service';
import { GraffitiPhotoController } from './graffitiphoto.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
	imports: [PrismaModule],
	controllers: [GraffitiPhotoController],
	providers: [GraffitiPhotoService],
})
export class GraffitiPhotoModule {}
