import fs from 'fs';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
const piexif = require('piexifjs');

export class MetadataServiceJS {
	constructor() {}

	removeMetadata = async (file) => {
		const getBase64DataFromJpegFile = (filename) =>
			fs.readFileSync(filename).toString('binary');

		let orientation = await sharp(file.buffer)
			.metadata()
			.then((metadata) => {
				console.log('metadata', metadata);
				console.log('exif: ', metadata.exif);
				return metadata.orientation;
			});
		let tempFileName = `temp_${uuidv4()}.jpg`;
		await sharp(file.buffer).toFile(`./${tempFileName}`);

		const imageData = getBase64DataFromJpegFile(`./${tempFileName}`);
		const scrubbedData = piexif.remove(imageData);
		let tempBuffer = Buffer.from(scrubbedData, 'binary');
		console.log('orientation', orientation);
		let fileBuffer = await sharp(tempBuffer)
			.withMetadata({
				orientation: orientation,
			})
			.toBuffer();

		if (fs.existsSync(`./${tempFileName}`)) {
			fs.unlinkSync(`./${tempFileName}`);
			// fs.unlink(`./${tempFileName}`, (err) => {
			// 	if (err) {
			// 		console.log(`Error deleting ${tempFileName}:`);
			// 		console.error(err);
			// 	} else {
			// 		console.log(`${tempFileName} was deleted`);
			// 	}
			// });
		}

		return fileBuffer;
	};
}

// fs.writeFileSync('./scrubbed.png', fileBuffer);
