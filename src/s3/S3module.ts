import { Module } from '@nestjs/common';
import { S3Service } from './S3service';

@Module({
	providers: [S3Service],
})
export class S3Module {}
