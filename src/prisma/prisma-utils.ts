import { Prisma } from '@prisma/client';
import { exec } from 'child_process';
import * as util from 'util';
import { PrismaService } from './prisma.service';

const execPromisify = util.promisify(exec);

const tables = Prisma.dmmf.datamodel.models
	.map((model) => model.dbName)
	.filter((table) => table);

const clearPostgres = async (prisma: PrismaService) => {
	await prisma.$transaction([
		...tables.map((table) =>
			prisma.$executeRawUnsafe(`TRUNCATE ${table} CASCADE;`),
		),
	]);
};

const clearDefault = async () => {
	execPromisify('npx prisma migrate reset --force --skip-seed');
};

export const clear = async (prisma: PrismaService) => {
	if (process.env.NODE_ENV === 'production') {
		return;
	}
	const executeClear = {
		postgres: clearPostgres,
	};

	const execute = clearPostgres || clearDefault;
	return await execute(prisma);
};
