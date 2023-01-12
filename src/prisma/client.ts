import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
	datasources: {
		db: {
			url: 'postgresql://prisma:prisma@graffinity-db-1.chtxvvd2ieid.eu-central-1.rds.amazonaws.com:5432/graffinity',
		},
	},
});
export default prisma;
