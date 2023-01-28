import { Module } from '@nestjs/common';

import { MetadataServiceJS } from './metadata.servicejs';
import { MetadataService } from './metadata.service';

@Module({
	providers: [MetadataServiceJS, MetadataService],
	exports: [MetadataService],
})
export class MetadataModule {}
