import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [PrismaModule, ConfigModule],
	controllers: [ArtistController],
	providers: [ArtistService],
})
export class ArtistModule {}
