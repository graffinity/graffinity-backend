import { PrismaClient } from '@prisma/client';
import { DataFactory } from './data/util/DataFactory';
import { GraffitiAndGraffitiPhotoCreateDto } from './data/util/GraffitiAndGraffitiPhotoEntity';

export const prisma = new PrismaClient();
let testDataFactory: DataFactory = DataFactory.getInstance();

export async function main() {
	console.log('Seeding...');

	// ----------------------------

	// User test data
	let users = await testDataFactory.getListofUsersWithHashedPassword();
	let res1 = users.map(async (user) => {
		return await prisma.user.upsert({
			where: {
				username: user.username,
			},
			update: {},
			create: {
				name: user.name,
				lastname: user.lastname,
				username: user.username,
				email: user.email,
				password: user.password,
			},
		});
	});

	await Promise.all(res1);

	let user = await testDataFactory.getValidUser();
	await prisma.user.upsert({
		where: { username: user.username },
		update: {},
		create: {
			name: user.name,
			lastname: user.lastname,
			username: user.username,
			email: user.email,
			password: user.password,
		},
	});

	await Promise.all(res1);

	let userWithHashedPassword =
		await testDataFactory.getValidUserWithHashedPassword();
	await prisma.user.upsert({
		where: { username: userWithHashedPassword.username },
		update: {},
		create: {
			name: userWithHashedPassword.name,
			lastname: userWithHashedPassword.lastname,
			username: userWithHashedPassword.username,
			email: userWithHashedPassword.email,
			password: userWithHashedPassword.password,
		},
	});

	console.log('User data seed success!');

	// ----------------------------

	// Category test data

	let categories = testDataFactory.getListOfCategories();
	categories.forEach(async (category) => {
		await prisma.category.upsert({
			where: { name: category.name },
			update: {},
			create: {
				name: category.name,
			},
		});
	});

	console.log('Category data seed success!');

	// ----------------------------

	// GraffitiPost test data

	let graffitisAndPhotos: GraffitiAndGraffitiPhotoCreateDto[] =
		testDataFactory.getGraffitiAndGraffitiPhotoCreateRequests();
	let res2 = graffitisAndPhotos.map(
		async (graffitiAndPhoto: GraffitiAndGraffitiPhotoCreateDto) => {
			let createdGraffiti = await prisma.graffiti.upsert({
				where: {
					name: graffitiAndPhoto.graffiti.name,
				},
				update: {},
				create: {
					name: graffitiAndPhoto.graffiti.name,
					description: graffitiAndPhoto.graffiti.description,
					latitude: graffitiAndPhoto.graffiti.latitude,
					longitude: graffitiAndPhoto.graffiti.longitude,
					address: graffitiAndPhoto.graffiti.address,
					artists: {
						createMany: {
							data: graffitiAndPhoto.graffiti.artistIds.map((id) => ({
								artistId: id,
							})),
						},
					},
					categories: {
						createMany: {
							data: graffitiAndPhoto.graffiti.categoryIds.map((id) => ({
								categoryId: id,
							})),
						},
					},
					author: {
						connect: {
							id: graffitiAndPhoto.graffiti.authorId,
						},
					},
				},
			});

			await Promise.all(res2);

			let res3 = graffitiAndPhoto.graffitiPhotos.map(async (photo) => {
				photo.graffitiId = createdGraffiti.id;
				return await prisma.graffitiPhoto.upsert({
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

			let result = await Promise.all(res3);

			let finalRes = { createdGraffiti, result };
			return finalRes;
		},
	);

	await Promise.all(res2);

	console.log('Graffiti and photo successfully connected.:0');
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
