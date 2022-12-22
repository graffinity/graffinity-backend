import { Injectable, Body, Param } from '@nestjs/common';
//import piexif, { IExif, IExifElement, TagValues } from 'piexif-ts';
const fs = require('fs');
const piexif = require('piexifjs');

@Injectable()
export class MetadataStrippingService {
	// async stripMetadata(file: Blob) {
	// 	const reader = new FileReader();
	// 	reader.onloadend = () => {
	// 		const result = load(reader.result as string);
	// 		console.log('result:', result); // to see the original exif data
	// 		const removed = remove(reader.result as string);
	// 		console.log('after removed:', load(removed)); // now you can see all the exif data is gone.
	// 	};
	// 	reader.readAsText(file);
	// 	let arraybuffer = await file.arrayBuffer();
	// 	let buffer = Buffer.from(arraybuffer);
	// 	return buffer;
	// }
	// }

	async stripMetadata(file: Express.Multer.File): Promise<Buffer> {
		// Handy utility functions
		const getBase64DataFromJpegFile = (filename: string) =>
			fs.readFileSync(file.originalname).toString('binary');
		const getExifFromJpegFile = (filename: string) =>
			piexif.load(getBase64DataFromJpegFile(file.originalname));

		const ImageData = getBase64DataFromJpegFile(file.path);
		const scrubbedImageData = piexif.remove(ImageData);
		const fileBuffer = Buffer.from(scrubbedImageData, 'binary');
		fs.writeFileSync(file.path, fileBuffer);

		function debugExif(exif: any) {
			for (const ifd in exif) {
				if (ifd == 'thumbnail') {
					const thumbnailData = exif[ifd] === null ? 'null' : exif[ifd];
					console.log(`- thumbnail: ${thumbnailData}`);
				} else {
					console.log(`- ${ifd}`);
					for (const tag in exif[ifd]) {
						console.log(
							`    - ${piexif.TAGS[ifd][tag]['name']}: ${exif[ifd][tag]}`,
						);
					}
				}
			}
		}

		debugExif(getExifFromJpegFile(file.path));

		return fileBuffer;
		// }
	}
}

// import { readFile, writeFile, unlink } from 'fs';
// import { promisify } from 'util';
// import sharp from 'sharp';
// import { v4 as uuid } from 'uuid';

// @Injectable()
// export class MetadataStrippingService {
// 	async stripMetadata(imageBuffer: Buffer): Promise<Buffer> {
// 		// Save the image buffer to a temporary file
// 		const imagePath = this.saveImageToTempFile(imageBuffer);

// 		// Read the image data from the file
// 		const imageData = await promisify(readFile)(imagePath);

// 		// Strip the metadata from the image data
// 		const strippedImageData = await sharp(imageData)
// 			.withMetadata({ exif: {false}).toBuffer();

// 		// Save the stripped image data to a new buffer
// 		const strippedImageBuffer = Buffer.from(strippedImageData);

// 		// Delete the temporary image file
// 		await this.deleteImageTempFile(imagePath);

// 		return strippedImageBuffer;
// 	}

// 	saveImageToTempFile(imageBuffer: Buffer): string {
// 		// Generate a unique file name
// 		const fileName = `${uuid()}.tmp`;

// 		// Save the image buffer to the file
// 		writeFile(fileName, imageBuffer, function (err) {
// 			if (err) {
// 				return 'your message';
// 			} else {
// 				return 'success';
// 			}
// 		});

// 		return fileName;
// 	}

// 	async deleteImageTempFile(imagePath: string): Promise<void> {
// 		await promisify(unlink)(imagePath);
// 	}
// }
