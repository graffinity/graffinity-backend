import { Injectable } from '@nestjs/common';
import { MetadataServiceJS } from './metadata.servicejs';

@Injectable()
export class MetadataService extends MetadataServiceJS {
	constructor() {
		super();
	}
}
