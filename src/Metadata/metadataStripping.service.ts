import { Injectable, Body, Param } from '@nestjs/common';
import { readFile, writeFile, unlink } from 'fs';
import { promisify } from 'util';
import sharp from 'sharp';
import { v4 as uuid } from 'uuid';

@Injectable()
export class MetadataStrippingService {
	async stripMetadata(imageBuffer: Buffer): Promise<Buffer> {
		// Save the image buffer to a temporary file
		const imagePath = this.saveImageToTempFile(imageBuffer);

		// Read the image data from the file
		const imageData = await promisify(readFile)(imagePath);

		// Strip the metadata from the image data
		const strippedImageData = await sharp(imageData).withMetadata().toBuffer();

		// Save the stripped image data to a new buffer
		const strippedImageBuffer = Buffer.from(strippedImageData);

		// Delete the temporary image file
		await this.deleteImageTempFile(imagePath);

		return strippedImageBuffer;
	}

	private saveImageToTempFile(imageBuffer: Buffer): string {
		// Generate a unique file name
		const fileName = `${uuid()}.tmp`;

		// Save the image buffer to the file
		writeFile(fileName, imageBuffer, function (err) {
			if (err) {
				return 'your message';
			} else {
				return 'success';
			}
		});

		return fileName;
	}

	async deleteImageTempFile(imagePath: string): Promise<void> {
		await promisify(unlink)(imagePath);
	}

	// ... other service methods ...
}
