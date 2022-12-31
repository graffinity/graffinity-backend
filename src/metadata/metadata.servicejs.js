import fs from 'fs';
import sharp from 'sharp';
const piexif = require('piexifjs');

export class MetadataServiceJS {
	constructor() {}

	getMetadata = async () => {};

	removeMetadata = async (file) => {
		const getBase64DataFromJpegFile = (filename) =>
			fs.readFileSync(filename).toString('binary');

		let orientation = await sharp(file.buffer)
			.metadata()
			.then((metadata) => {
				console.log('metadata', metadata);
				return metadata.orientation;
			});

		await sharp(file.buffer).toFile('temp.jpg');

		const imageData = getBase64DataFromJpegFile('temp.jpg');
		const scrubbedData = piexif.remove(imageData);
		let tempBuffer = Buffer.from(scrubbedData, 'binary');
		console.log('orientation', orientation);
		let fileBuffer = await sharp(tempBuffer)
			.withMetadata({
				orientation: orientation,
			})
			.toBuffer();
		// fs.writeFileSync('./scrubbed.png', fileBuffer);

		fs.unlinkSync('temp.jpg');

		return fileBuffer;
	};

	calculatePictureScore = async () => {
		return { name: 'PictureScore' };
	};
}
