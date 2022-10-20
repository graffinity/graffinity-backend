import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";

import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const graffitiTestData = (): any => ({
	name: faker.internet.domainWord(),
	description: faker.lorem.sentence(),
	location: faker.address.city(),
	createdAt: faker.date.past(),
});

async function main() {
	const fakerRounds = 5;
	dotenv.config();
	console.log("Seeding...");
	for (let i = 0; i < fakerRounds; i++) {
		await prisma.graffiti.create({ data: graffitiTestData() });
	}
	console.log("Finished...");
}

main()
	.catch((e) => console.error(e))
	.finally(async () => {
		await prisma.$disconnect();
	});
