import { Injectable } from '@nestjs/common';
import { MetadataServiceJS } from './metadata.servicejs';
import sharp from 'sharp';

@Injectable()
export class MetadataService extends MetadataServiceJS {
	constructor() {
		super();
	}

	async getMetadata(file: Express.Multer.File) {
		let fileMetadata = await sharp(file.buffer).metadata();
		// console.log('fileMetadata', fileMetadata);
		return fileMetadata;
	}

	calculatePictureScore = async (metadata: sharp.Metadata) => {
		let score = 0;
		if (metadata.width && metadata.height) {
			if (metadata.width > 1000 && metadata.height > 1000) {
				score += 1;
			}
		}
		if (metadata.exif) {
			score += 1;
		}
		if (metadata.icc) {
			score += 1;
		}
		if (metadata.iptc) {
			score += 1;
		}
		if (metadata.xmp) {
			score += 1;
		}

		return score;
	};
}
