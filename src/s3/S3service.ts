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

	async uploadFile(file: Express.Multer.File) {
		if (this.AWS_S3_BUCKET_NAME) {
			await this.s3_upload(
				this.AWS_S3_BUCKET_NAME,
				file.originalname,
				file.mimetype,
				file.buffer,
			);
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
			const params: S3.Types.PutObjectRequest = {
				Bucket: bucket,
				Key: fileName,
				Body: dataBuffer,
				ACL: 'public-read',
				ContentType: mimetype,
				ContentDisposition: 'inline',
				// CreateBucketConfiguration: {
				// 	LocationConstraint: process.env.AWS_S3_REGION ?? 'eu-west-1',
				// },
			};
			console.log(params);

			let s3Response = await this.s3.upload(params).promise();

			console.log(s3Response);
			let url = s3Response.Location;
			console.log(url);
		} catch (e) {
			console.log(e);
		}
	}
}

export default S3Service;
