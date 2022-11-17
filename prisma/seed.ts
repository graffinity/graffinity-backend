import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as faker from '@faker-js/faker';

const prisma = new PrismaClient();

// generate random data for graffiti posts using faker
const graffitiTestData = (userId: number): any => ({
	name: faker.faker.internet.domainWord(),
	description: faker.faker.lorem.sentence(),
	location: faker.faker.address.city(),
	createdAt: faker.faker.date.past(),
	authorId: userId,
});

const categoryTestDataCreation = (): any => ({
	name: faker.faker.color.human(),
});

async function main() {
	const fakerRounds = 5;
	const fakerCategoryRounds = 3;
	dotenv.config();
	console.log('Seeding...');

	// User test data
	let user = await prisma.user.create({
		data: {
			name: 'john',
			lastname: 'doe',
			username: 'johndoe',
			email: 'johndoe@gmail.com',
			password: 'password',
		},
	});
	console.log('User data seed success!');

	// GraffitiPost test data
	for (let i = 0; i < fakerRounds; i++) {
		await prisma.graffiti.create({ data: graffitiTestData(user.id) });
	}
	console.log('Graffiti data seed success!');

	// GraffitiPost test data
	for (let i = 0; i < fakerCategoryRounds; i++) {
		await prisma.category.create({ data: categoryTestDataCreation() });
	}
	console.log('Category data seed success!');

	setTimeout(() => {
		console.log('Finished...');
	}, 300);
}

main()
	.catch((e) => console.error(e))
	.finally(async () => {
		await prisma.$disconnect();
	});
