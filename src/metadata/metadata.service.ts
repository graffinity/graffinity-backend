import { Injectable } from '@nestjs/common';
import sharp from 'sharp';

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
