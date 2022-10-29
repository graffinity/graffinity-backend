import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";

import * as faker from "@faker-js/faker";

const prisma = new PrismaClient();

const graffitiTestData = (userId: number): any => ({
	name: faker.faker.internet.domainWord(),
	description: faker.faker.lorem.sentence(),
	location: faker.faker.address.city(),
	createdAt: faker.faker.date.past(),
	authorId: 1
});

async function main() {
	const fakerRounds = 5;
	dotenv.config();
	console.log("Seeding...");
	let user = prisma.user.create({
		data: {
			email: "johndoe@gmail.com",
			name: "john",
			lastname: "doe",
			username: "john",
			password: "changeme",
		},
	});
	for (let i = 0; i < fakerRounds; i++) {
		await prisma.graffiti.create({ data: graffitiTestData((await user).id) });
	}
	console.log("Finished...");
}

main()
	.catch((e) => console.error(e))
	.finally(async () => {
		await prisma.$disconnect();
	});