import * as dotenv from 'dotenv';
import * as faker from '@faker-js/faker';
import { CreateGraffitiDto } from '../src/graffiti/dto/request/create-graffiti.dto';
import { Graffiti, PrismaClient } from '@prisma/client';
import { TestDataFactory } from './data/util/TestDataFactory';

export const prisma = new PrismaClient();
let testDataFactory: TestDataFactory = TestDataFactory.getInstance();

async function main() {
	console.log('Seeding...');

	// ----------------------------

	// User test data
	let user = testDataFactory.getValidUser();
	await prisma.user.upsert({
		where: { email: user.email },
		update: {},
		create: user,
	});

	let userWithHashedPassword =
		await testDataFactory.getValidUserWithHashedPassword();

	await prisma.user.upsert({
		where: { email: userWithHashedPassword.email },
		update: {},
		create: userWithHashedPassword,
	});

	console.log('User data seed success!');

	// ----------------------------

	// Category test data

	let categories = testDataFactory.getListOfCategories();
	categories.forEach(async (category) => {
		await prisma.category.upsert({
			where: { name: category.name },
			update: {},
			create: category,
		});
	});

	console.log('Category data seed success!');

	// ----------------------------

	// GraffitiPost test data

	let graffitis: Graffiti[] = testDataFactory.getListOfGraffitis();
	graffitis.forEach(async (graffiti) => {
		await prisma.graffiti.upsert({
			where: { id: graffiti.id },
			update: {},
			create: graffiti,
		});
	});

	console.log('Graffiti data seed success!');

	setTimeout(() => {
		console.log('Finished...');
	}, 300);
}
// ----------------------------
// Done...

main()
	.catch((e) => {
		console.error(e);
	})
	.finally(async () => {
		await prisma.$disconnect();
		process.exit(0);
	});
