import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { S3 } from 'aws-sdk';

@Injectable()
export class S3Service {
	constructor() {}
	AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
	s3 = new AWS.S3({
		accessKeyId: process.env.AWS_S3_ACCESS_KEY,
		secretAccessKey: process.env.AWS_S3_KEY_SECRET,
	});

	async uploadFile(prevFile: IFile, file: Express.Multer.File) {
		if (this.AWS_S3_BUCKET_NAME) {
			let response = await this.s3_upload(
				this.AWS_S3_BUCKET_NAME,
				file.originalname,
				file.mimetype,
				file.buffer,
			);
			return response;
		} else {
			console.log('No bucket name');
		}
	}

	async s3_upload(
		bucket: string,
		fileName: string,
		mimetype: string,
		dataBuffer: Buffer,
	) {
		try {
			// const blob = new Blob([new Uint8Array(await file.stream())], {
			// 	type: file.type,
			// });

			const params: S3.Types.PutObjectRequest = {
				Bucket: bucket,
				Key: fileName,
				Body: dataBuffer,
				ACL: 'public-read',
				ContentType: mimetype,
				ContentDisposition: 'inline',
				// CreateBucketConfiguration: {
				// 	LocationConstraint: process.env.AWS_S3_REGION,
				// },
			};
			console.log(params);

			let s3Response = await this.s3.upload(params).promise();

			console.log(s3Response);
			return s3Response;
		} catch (e) {
			console.log(e);
		}
	}
}

export interface IFile {
	buffer: File;
	mimetype: string;
	originalname: string;
}

export declare var iFile: IFile;
export default S3Service;
