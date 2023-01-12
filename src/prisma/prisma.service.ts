import {
	INestApplication,
	Injectable,
	OnModuleDestroy,
	OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { clear } from './prisma-utils';

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	constructor(config: ConfigService) {
		super({
			datasources: {
				db: {
					url: config.get<string>('DATABASE_URL'),
				},
			},
			log: ['error', 'info', 'warn', 'query'],
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
		clear();
		console.log('Database cleaned');
	}
}
