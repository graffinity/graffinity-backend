import { Injectable } from '@nestjs/common';
import EXIF from 'exif-js';
import sharp from 'sharp';
import { ExifParserFactory } from 'ts-exif-parser';
interface Metadata {
	dateTaken?: string;
	camera?: string;
	aperture?: number;
	shutterSpeed?: number;
	ISO?: number;
}

@Injectable()
export class PhotoRankingService {
	async extractMetadata(file: Express.Multer.File) {
		// const exifData = EXIF.getData(file.path, function () {
		// 	let data = {
		// 		dateTaken: EXIF.getTag(this, 'DateTimeOriginal'),
		// 		camera: EXIF.getTag(this, 'Model'),
		// 		aperture: EXIF.getTag(this, 'FNumber'),
		// 		shutterSpeed: EXIF.getTag(this, 'ExposureTime'),
		// 		ISO: EXIF.getTag(this, 'ISOSpeedRatings'),
		// 	};

		// 	console.log('exifData: ', exifData);
		// 	console.log('url: ', file.path);
		// 	console.log('data: ', data);

		// 	return data;
		// });

		let image = sharp(file.buffer);

		let metadata = await image.metadata().then(function (metadata) {
			return metadata;
		});
		if (metadata.exif) {
		}
		const parser = ExifParserFactory.create(file.buffer);
		let temp = parser.parse();
		parser.enableTagNames(true);
		parser.enableSimpleValues(true);
		parser.enableReturnTags(true);
		parser.enableBinaryFields(true);
		parser.enableImageSize(true);
		parser.enablePointers(true);
		const exif = ExifParserFactory.create(file.buffer).parse();
		console.log('exifData: ', exif);

		console.log('temp: ', temp);
		console.log('metadata: ', metadata);

		// Return the metadata object
		return metadata;
	}
}
