import aws from 'aws-sdk';

const handler = async (req: any, res: any) => {
	try {
		// 1.
		const s3 = new aws.S3({
			accessKeyId: process.env.AWS_ACCESS_KEY,
			secretAccessKey: process.env.AWS_SECRET_KEY,
			region: process.env.AWS_REGION,
		});

		// 2.
		aws.config.update({
			accessKeyId: process.env.AWS_ACCESS_KEY,
			secretAccessKey: process.env.AWS_SECRET_KEY,
			region: process.env.AWS_REGION,
			signatureVersion: 'v4',
		});

		// 3.
		const post = await s3.createPresignedPost({
			Bucket: process.env.AWS_S3_BUCKET_NAME,
			Fields: {
				key: req.query.file,
			},
			Expires: 60, // seconds
			Conditions: [
				['content-length-range', 0, 5048576], // up to 1 MB
			],
		});

		// 4.
		let response = res.status(200).json(post);
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
	}
};

export default handler;
