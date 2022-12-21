import { Injectable } from '@nestjs/common';
import EXIF from 'exif-js';

interface Metadata {
	dateTaken: string;
	camera: string;
	aperture: number;
	shutterSpeed: number;
	ISO: number;
}

@Injectable()
export class PhotoRankingService {
	// Define a function to extract metadata from a photo
	extractMetadata(photo: File): Metadata {
		// Create a new metadata object
		console.log('kys kus');
		const metadata: Metadata = {
			dateTaken: '',
			camera: '',
			aperture: 0,
			shutterSpeed: 0,
			ISO: 0,
		};

		// Extract the EXIF data from the photo
		const exifData = EXIF.getData(photo, function () {
			// Extract the metadata values and store them in the metadata object
			metadata.dateTaken = exifData.exif.DateTimeOriginal;
			metadata.camera = exifData.image.Model;
			metadata.aperture = exifData.exif.FNumber;
			metadata.shutterSpeed = exifData.exif.ExposureTime;
			metadata.ISO = exifData.exif.ISOSpeedRatings;
			console.log(exifData);
			console.log(photo);
			console.log(metadata);
			console.log('bum bum ja ni bum bum');
		});

		// Return the metadata object
		return metadata;
	}
}
