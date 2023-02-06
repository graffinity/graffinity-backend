import fs from 'fs';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
const piexif = require('piexifjs');

export class MetadataServiceJS {
	constructor() {}

	removeMetadata = async (file) => {
		const getBase64DataFromJpegFile = (filename) =>
			fs.readFileSync(filename).toString('binary');

		// Get the orientation of the image
		let orientation = await sharp(file.buffer)
			.metadata()
			.then((metadata) => {
				return metadata.orientation;
			});

		// Save the image to a temp file
		let tempFileName = `temp_${uuidv4()}.jpg`;
		await sharp(file.buffer).toFile(`./${tempFileName}`);

		// Remove the metadata from the temp file
		const imageData = getBase64DataFromJpegFile(`./${tempFileName}`);
		const scrubbedData = piexif.remove(imageData);

		// Convert the temp file to a buffer
		let tempBuffer = Buffer.from(scrubbedData, 'binary');
		let fileBuffer = await sharp(tempBuffer)
			.withMetadata({
				orientation: orientation,
			})
			.png()
			.toBuffer();

		// Delete the temp file
		if (fs.existsSync(`./${tempFileName}`)) {
			fs.unlinkSync(`./${tempFileName}`);
		}

		return fileBuffer;
	};
}
