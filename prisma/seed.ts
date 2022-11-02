import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";

import * as faker from "@faker-js/faker";

const prisma = new PrismaClient();

// generate random data for graffiti posts using faker
const graffitiTestData = (userId: number): any => ({
	name: faker.faker.internet.domainWord(),
	description: faker.faker.lorem.sentence(),
	location: faker.faker.address.city(),
	createdAt: faker.faker.date.past(),
	authorId: userId,
});

async function main() {
	const fakerRounds = 5;
	dotenv.config();
	console.log("Seeding...");

	// User test data
	let user = await prisma.user.create({
		data: {
			name: "john",
			lastname: "doe",
			username: "johndoe",
			email: "johndoe@gmail.com",
			password: "password",
		},
	});

	// GraffitiPost test data
	for (let i = 0; i < fakerRounds; i++) {
		await prisma.graffiti.create({ data: graffitiTestData(user.id) });
	}
	console.log("Finished...");
}

main()
	.catch((e) => console.error(e))
	.finally(async () => {
		await prisma.$disconnect();
	});
