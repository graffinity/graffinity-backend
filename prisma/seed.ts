import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";

import * as faker from "@faker-js/faker";

const prisma = new PrismaClient();

const graffitiTestData = (): any => ({
	name: faker.faker.internet.domainWord(),
	description: faker.faker.lorem.sentence(),
	location: faker.faker.address.city(),
	createdAt: faker.faker.date.past(),
});

async function main() {
	const fakerRounds = 5;
	dotenv.config();
	console.log("Seeding...");
	for (let i = 0; i < fakerRounds; i++) {
		await prisma.graffiti.create({ data: graffitiTestData() });
	}
	prisma.user.create({
		data: {
			email: "johndoe@gmail.com",
			name: "john",
			lastname: "doe",
			username: "john",
			password: "changeme",
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	});
	console.log("Finished...");
}

main()
	.catch((e) => console.error(e))
	.finally(async () => {
		await prisma.$disconnect();
	});
	// curl -X POST http://localhost:8080/auth/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"
	// curl http://localhost:8080/profile -H 