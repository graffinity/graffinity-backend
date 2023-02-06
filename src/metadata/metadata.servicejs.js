import fs from 'fs';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
const piexif = require('piexifjs');

export class MetadataServiceJS {
	constructor() {}

	removeMetadata = async (file) => {
		let orientation = await sharp(file.buffer)
			.metadata()
			.then((metadata) => {
				return metadata.orientation;
			});
		let tempFileName = `temp_${uuidv4()}.jpg`;
		await sharp(file.buffer).toFile(`./${tempFileName}`);

		const imageData = getBase64DataFromJpegFile(`./${tempFileName}`);
		const scrubbedData = piexif.remove(imageData);
		let tempBuffer = Buffer.from(scrubbedData, 'binary');
		let fileBuffer = await sharp(tempBuffer)
			.withMetadata({
				orientation: orientation,
			})
			.png()
			.toBuffer();

		if (fs.existsSync(`./${tempFileName}`)) {
			fs.unlinkSync(`./${tempFileName}`);
		}

		return fileBuffer;
	};
}

const getBase64DataFromJpegFile = (filename) =>
	fs.readFileSync(filename).toString('binary');
