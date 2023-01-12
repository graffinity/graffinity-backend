import { Injectable } from '@nestjs/common';

@Injectable()
export class MetadataService {
	constructor() {}

	getMetadata = async (file: Express.Multer.File) => {};

	removeMetadata = async () => {
		return { name: 'MetadataRemoved' };
	};

	calculatePictureScore = async () => {
		return { name: 'PictureScore' };
	};
}
