import { Injectable } from '@nestjs/common';
import sharp from 'sharp';
import piexif from 'piexif-ts';
import fs from 'fs';
import ExifTransformer from 'exif-be-gone';

@Injectable()
export class MetadataService {
	constructor() {}

	getMetadata = async (file: Express.Multer.File) => {
		// console.log(file);
		let exif = await sharp(file.buffer).metadata();
		exif.exif?.map(() => {
			return 0;
		});
		// console.log('metadata', exif);

		// console.log('metadata2', exif);

		// let exif2 = await sharp(file.buffer)
		// 	.withMetadata({
		// 		density: 101,
		// 	})
		// 	.metadata();
		// console.log('metadata3', exif2);

		let jpeg = await sharp(file.buffer)
			.withMetadata({
				density: 101,
				orientation: 7,
				exif: {},
			})
			.toFile('out.jpg');
		console.log('jpeg', jpeg);

		return exif;
	};

	removeMetadata = async () => {
		return { name: 'MetadataRemoved' };
	};

	calculatePictureScore = async () => {
		return { name: 'PictureScore' };
	};
}
