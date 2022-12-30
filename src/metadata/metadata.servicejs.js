import fs from 'fs';
import sharp from 'sharp';
const piexif = require('piexifjs');

export class MetadataServiceJS {
	constructor() {}

	getMetadata = async (file) => {
		const getBase64DataFromJpegFile = (filename) =>
			fs.readFileSync(filename).toString('binary');

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
