import { Injectable, Body, Param } from '@nestjs/common';
import piexif, { IExif, IExifElement, TagValues } from 'piexif-ts';
const fs = require('fs');
// const piexif = require('piexifjs');

@Injectable()
export class MetadataStrippingService {
	async stripMetadata(file: Express.Multer.File): Promise<Buffer> {
		// Handy utility functions
		const getBase64DataFromJpegFile = (filename: string) =>
			fs.readFileSync(file.path).toString('binary');
		const getExifFromJpegFile = (filename: string) =>
			piexif.load(getBase64DataFromJpegFile(file.path));

		const ImageData = getBase64DataFromJpegFile(file.path);
		const scrubbedImageData = piexif.remove(ImageData);
		const fileBuffer = Buffer.from(scrubbedImageData, 'binary');
		fs.writeFileSync(file.path, fileBuffer);

		return fileBuffer;
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
