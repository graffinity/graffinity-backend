import {
	INestApplication,
	Injectable,
	OnModuleDestroy,
	OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { clear } from './prisma-utils';

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	constructor() {
		super({
			log: ['error', 'info'],
		});
	}

	async onModuleInit() {
		await this.$connect();
	}

	async onModuleDestroy() {
		await this.$disconnect();
	}

	async enableShutdownHooks(app: INestApplication) {
		this.$on('beforeExit', async () => {
			await app.close();
		});
	}

	async cleanDatabase() {
		if (process.env.NODE_ENV === 'production') {
			return;
		}
		clear(this);
		console.log('Database cleaned');
	}
}
