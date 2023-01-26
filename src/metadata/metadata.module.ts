import { Module } from '@nestjs/common';

import { MetadataServiceJS } from './metadata.servicejs';

@Module({
	providers: [MetadataServiceJS],
})
export class MetadataModule {}
