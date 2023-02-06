import { Injectable } from '@nestjs/common';
import { MetadataServiceJS } from './metadata.servicejs';
import sharp from 'sharp';
import { ExifParserFactory, ExifTags } from 'ts-exif-parser';

@Injectable()
export class MetadataService extends MetadataServiceJS {
	constructor() {
		super();
	}

	async extractExifData(file: Express.Multer.File) {
		const parser = ExifParserFactory.create(file.buffer)
			.enableBinaryFields(true)
			.enableImageSize(true)
			.enablePointers(true)
			.enableReturnTags(true)
			.enableSimpleValues(true)
			.enableTagNames(true);
		const result = parser.parse();

		console.log('ts-exif-parser', result);
		console.log('Tags: ', result.tags);

		return result;
	}

	async getMetadata(file: Express.Multer.File) {
		let fileMetadata = await sharp(file.buffer).metadata();
		let exif = await this.extractExifData(file);
		file.filename;

		let result: IExifData = {
			metadata: fileMetadata,
			tags: exif.tags,
		};

		return result;
	}

	// TODO: Improve the algorithm
	calculatePictureScore = (metadata: sharp.Metadata, exifTags?: ExifTags) => {
		let score = 0;

		// Width and height
		if (metadata.width && metadata.height) {
			if (metadata.width > 1280 && metadata.height > 1280) {
				score += 50;
			} else if (metadata.width > 1000 && metadata.height > 1000) {
				score += 40;
			} else if (metadata.width > 720 && metadata.height > 720) {
				score += 30;
			} else if (metadata.width > 480 && metadata.height > 480) {
				score += 15;
			} else {
				score -= 10;
			}
		}

		if (exifTags) {
			// ISO speed rating (SensitivityType)
			if (exifTags.ISO) {
				if (exifTags.ISO > 1600) {
					score -= 25;
				} else if (exifTags.ISO > 800) {
					score -= 10;
				} else if (exifTags.ISO < 800) {
					score += 10;
				} else if (exifTags.ISO < 400 && exifTags.ISO > 200) {
					score += 20;
				} else if (exifTags.ISO < 200 && exifTags.ISO > 100) {
					score += 35;
				}
			}

			// Focal length (in 35mm format)
			if (exifTags.FocalLengthIn35mmFormat) {
				let focalLength = Number(exifTags.FocalLengthIn35mmFormat);

				if (!isNaN(focalLength)) {
					if (focalLength > 50) {
						score -= 10;
					} else if (focalLength > 22 && focalLength < 30) {
						score += 15;
					} else if (focalLength > 12 && focalLength < 22) {
						score += 20;
					}
				}
			}
			// Exposure time (in seconds)
			if (exifTags.ExposureTime) {
				if (exifTags.ExposureTime > 1 / 60) {
					score += 15;
				} else if (exifTags.ExposureTime > 1 / 120) {
					score += 10;
				} else if (exifTags.ExposureTime > 1 / 200) {
					score += 5;
				} else if (exifTags.ExposureTime > 1 / 500) {
					score -= 5;
				} else {
					score -= 10;
				}
			}

			// Aperture value (F-number)
			if (exifTags.ApertureValue) {
				let aperture = Number(exifTags.ApertureValue);

				if (!isNaN(aperture)) {
					if (aperture > 4) {
						score += 10;
					} else if (aperture > 3) {
						score += 5;
					} else if (aperture > 2) {
						score += 2;
					}
				}
			}

			// Digital zoom ratio (if > 1, the picture is cropped)
			if (exifTags.DigitalZoomRatio) {
				let digitalZoomRatio = Number(exifTags.DigitalZoomRatio);

				if (!isNaN(digitalZoomRatio)) {
					if (digitalZoomRatio > 3) {
						score -= 25;
					} else if (digitalZoomRatio > 2) {
						score -= 15;
					} else if (digitalZoomRatio > 1) {
						score -= 5;
					}
				}
			}

			// DPI (dots per inch)
			if (exifTags.XResolution && exifTags.YResolution) {
				let xResolution = Number(exifTags.XResolution);
				let yResolution = Number(exifTags.YResolution);

				if (!isNaN(xResolution) && !isNaN(yResolution)) {
					if (xResolution > 300 && yResolution > 300) {
						score += 10;
					} else if (xResolution > 200 && yResolution > 200) {
						score += 5;
					}
				}
			}

			// Exposure compensation (in EV)
			if (exifTags.ExposureCompensation) {
				let exposureCompensation = Number(exifTags.ExposureCompensation);

				if (!isNaN(exposureCompensation)) {
					if (exposureCompensation === 0) {
						score += 10;
					} else if (exposureCompensation < 0) {
						score += exposureCompensation * 15;
					} else if (exposureCompensation > 0) {
						score -= exposureCompensation * 10;
					}
				}
			}

			// Sharpness (0 = soft, 1 = normal, 2 = hard)
			if (exifTags.Sharpness) {
				let sharpness = Number(exifTags.Sharpness);

				if (!isNaN(sharpness)) {
					if (sharpness <= 1) {
						score += 10;
					} else if (sharpness > 1 && sharpness < 2) {
						score -= 10 - sharpness * 10;
					} else if (sharpness > 2 && sharpness < 3) {
						score -= sharpness * 10;
					} else {
						score -= 40;
					}
				}
			}

			return score;
		}
	};
}

interface IExifData {
	metadata: sharp.Metadata;
	tags?: ExifTags;
}
