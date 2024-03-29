import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class S3Service {
	constructor() {}
	AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
	s3 = new AWS.S3({
		accessKeyId: process.env.AWS_S3_ACCESS_KEY,
		secretAccessKey: process.env.AWS_S3_KEY_SECRET,
	});

	uploadFile = async (file: Express.Multer.File) => {
		if (this.AWS_S3_BUCKET_NAME) {
			let response = await this.s3_upload(
				this.AWS_S3_BUCKET_NAME,
				file.originalname,
				file.mimetype,
				file.buffer,
			);

			return response;
		} else {
			throw new Error('AWS_S3_BUCKET_NAME not set');
		}
	};

	s3_upload = async (
		bucket: string,
		fileName: string,
		mimetype: string,
		dataBuffer: Buffer,
	) => {
		try {
			let newFilename = `${uuidv4()}.png`;
			const params: S3.Types.PutObjectRequest = {
				Bucket: bucket,
				Key: newFilename,
				Body: dataBuffer,
				ACL: 'public-read',
				ContentType: mimetype,
				ContentDisposition: 'inline',
			};

			let s3Response = await this.s3.upload(params).promise();

			return s3Response;
		} catch (e) {
			throw new Error(e);
		}
	};
}

export default S3Service;
