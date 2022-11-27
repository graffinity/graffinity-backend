import { Injectable, Req, Res } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { Readable } from 'node:stream';

@Injectable()
export class S3Service {
	constructor() {}
	AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
	s3 = new AWS.S3({
		accessKeyId: process.env.AWS_S3_ACCESS_KEY,
		secretAccessKey: process.env.AWS_S3_KEY_SECRET,
		region: 'eu-central-1',
	});

	async uploadFile(file: IFile) {
		const { originalname } = file;

		if (this.AWS_S3_BUCKET_NAME) {
			await this.s3_upload(
				file.buffer,
				this.AWS_S3_BUCKET_NAME,
				originalname,
				file.mimetype,
			);
		} else {
			console.log('No bucket name');
		}
	}

	async s3_upload(
		file: string | Buffer | Uint8Array | Blob | Readable,
		bucket: string,
		name: string,
		mimetype: string,
	) {
		const params = {
			Bucket: bucket,
			Key: String(name),
			Body: file.toString('base64'),
			ACL: 'public-read',
			ContentType: mimetype,
			ContentDisposition: 'inline',
			CreateBucketConfiguration: {
				LocationConstraint: 'eu-central-1',
			},
		};

		// console.log(params);

		try {
			let s3Response = await this.s3.upload(params).promise();
			console.log('s3Response: ', s3Response);
		} catch (e) {
			console.log(e);
		}
	}
}
export interface IFile {
	buffer: string | Buffer | Uint8Array | Blob | Readable;
	mimetype: string;
	originalname: string;
}

export declare var iFile: IFile;
export default S3Service;
