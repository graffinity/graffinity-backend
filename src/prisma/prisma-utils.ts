import { Prisma, PrismaClient } from '@prisma/client';
import { exec } from 'child_process';
import * as util from 'util';

const execPromisify = util.promisify(exec);
const prisma = new PrismaClient();

const tables = Prisma.dmmf.datamodel.models
	.map((model) => model.dbName)
	.filter((table) => table);

const clearPostgres = async () => {
	await prisma.$transaction([
		...tables.map((table) =>
			prisma.$executeRawUnsafe(`TRUNCATE ${table} CASCADE;`),
		),
	]);
};

const clearDefault = async () => {
	execPromisify('npx prisma migrate reset --force --skip-seed');
};

export const clear = async () => {
	if (process.env.NODE_ENV === 'production') {
		return;
	}
	const executeClear = {
		postgres: clearPostgres,
	};

	const execute = clearPostgres || clearDefault;
	return execute();
};
