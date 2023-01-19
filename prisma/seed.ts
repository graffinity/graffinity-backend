import { GraffitiPhoto, PrismaClient } from '@prisma/client';
import { CreateGraffitiDto } from '../src/graffiti/dto/request/create-graffiti.dto';
import { DataFactory } from './data/util/DataFactory';

export const prisma = new PrismaClient();
let testDataFactory: DataFactory = DataFactory.getInstance();

export async function main() {
	console.log('Seeding...');

	// ----------------------------

	// User test data
	let users = await testDataFactory.getListofUsersWithHashedPassword();
	users.forEach(async (user) => {
		await prisma?.user.upsert({
			where: {
				username: user.username,
			},
			update: {},
			create: user,
		});
	});

	let user = testDataFactory.getValidUser();
	await prisma.user.upsert({
		where: { username: user.username },
		update: {
			username: user.username,
			email: user.email,
		},
		create: user,
	});

	let userWithHashedPassword =
		await testDataFactory.getValidUserWithHashedPassword();
	await prisma.user.upsert({
		where: { username: userWithHashedPassword.username },
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

	let graffitis: CreateGraffitiDto[] =
		testDataFactory.getListOfGraffitiCreateRequests();
	graffitis.forEach(async (graffiti: CreateGraffitiDto) => {
		await prisma.graffiti.upsert({
			where: {
				name: graffiti.name,
			},
			update: {},
			create: {
				name: graffiti.name,
				description: graffiti.description,
				latitude: graffiti.latitude,
				longitude: graffiti.longitude,
				artists: {
					createMany: {
						data: graffiti.artistIds.map((id) => ({
							artistId: id,
						})),
					},
				},
				categories: {
					createMany: {
						data: graffiti.categoryIds.map((id) => ({
							categoryId: id,
						})),
					},
				},
				author: {
					connect: {
						id: graffiti.authorId,
					},
				},
			},
		});
	});

	console.log('Graffiti data seed success!');

	let photos: GraffitiPhoto[] = testDataFactory.getListOfGraffitiPhotos();

	photos.forEach(async (photo) => {
		await prisma.graffitiPhoto.upsert({
			where: { url: photo.url },
			update: {},
			create: {
				url: photo.url,
				user: {
					connect: {
						id: photo.userId,
					},
				},
				graffiti: {
					connect: {
						id: photo.graffitiId,
					},
				},
			},
		});
	});

	console.log('Graffiti photo data seed success!');

	console.log('Finished...');
}
// ----------------------------
// Done...

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
