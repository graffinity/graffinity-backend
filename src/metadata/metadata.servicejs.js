import { Injectable } from '@nestjs/common';
import sharp from 'sharp';
const piexif = require('piexifjs');
import fs from 'fs';
import ExifTransformer from 'exif-be-gone';

export class MetadataServiceJS {
	constructor() {}

	getMetadata = async (file) => {
		// console.log(file);
		let exif = await sharp(file.buffer).metadata();
		exif.exif?.map(() => {
			return 0;
		});
		const getBase64DataFromJpegFile = (filename) =>
			fs.readFileSync(filename).toString('binary');
		const getExifFromJpegFile = (filename) =>
			piexif.load(getBase64DataFromJpegFile(filename));

		const hotelImageData = getBase64DataFromJpegFile(
			'/Users/kernius/graffinity/backend-graffinity/src/metadata/out.jpg',
		);
		const scrubbedHotelImageData = piexif.remove(hotelImageData);
		let fileBuffer = Buffer.from(scrubbedHotelImageData, 'binary');
		fs.writeFileSync('./scrubbed.jpg', fileBuffer);

		return exif;
	};

	removeMetadata = async () => {
		return { name: 'MetadataRemoved' };
	};

	calculatePictureScore = async () => {
		return { name: 'PictureScore' };
	};
}
