import { Module } from '@nestjs/common';
import { MetadataService } from './metadata.service';
import { MetadataServiceJS } from './metadata.servicejs';

@Module({
	providers: [MetadataService, MetadataServiceJS],
})
export class MetadataModule {}
