import { Category, Graffiti, PrismaClient, User } from '@prisma/client';
import argon2 from 'argon2';

export class TestDataFactory {
	private static instance: TestDataFactory;
	private constructor() {}

	public static getInstance(): TestDataFactory {
		if (!TestDataFactory.instance) {
			TestDataFactory.instance = new TestDataFactory();
		}
		return TestDataFactory.instance;
	}

	// User test data
	public getValidUser(): User {
		let newUser: User = {
			id: 1,
			name: 'John',
			lastname: 'Doe',
			username: 'johndoe',
			email: 'johndoe@gmail.com',
			password: 'password',
			refreshToken: 'some-refresh',
		};

		return newUser;
	}

	public async getValidUserWithHashedPassword(): Promise<User> {
		let hashedPassword = await argon2.hash('password');

		let newUser: User = {
			id: 2,
			name: 'Mary',
			lastname: 'Doe',
			username: 'marydoe',
			email: 'marydoe@gmail.com',
			password: hashedPassword,
			refreshToken: 'some-refresh',
		};

		return newUser;
	}

	// Category test data
	public getValidCategory(): Category {
		let newCategory = {
			id: 1,
			name: 'Category',
			description: 'Category description',
		};

		return newCategory;
	}

	public getListOfCategories(): Category[] {
		let categories = [
			{
				id: 1,
				name: 'Category 1',
				description: 'Category 1 description',
			},
			{
				id: 2,
				name: 'Category 2',
				description: 'Category 2 description',
			},
			{
				id: 3,
				name: 'Category 3',
				description: 'Category 3 description',
			},
		];

		return categories;
	}

	// Graffiti test data
	public getValidGraffiti(): Graffiti {
		let newGraffiti = {
			id: 1,
			name: 'Graffiti name 1',
			title: 'Graffiti title 1',
			description: 'Graffiti description 1',
			authorId: 1,
			userId: 1,
			categoryId: null,
			createdAt: new Date(),
			location: '54.687157,25.279652',
			// Change location from string to LatLng
			// latitude: 54.687157,
			// longitude: 25.279652,
		};
		return newGraffiti;
	}

	public getValidGraffitiWithCategory(): Graffiti {
		let newGraffiti = {
			id: 1,
			name: 'Graffiti name 1',
			title: 'Graffiti title 1',
			description: 'Graffiti description 1',
			authorId: 1,
			userId: 1,
			categoryId: 1,
			createdAt: new Date(),
			location: '54.687157,25.279652',
		};

		return newGraffiti;
	}

	public getListOfGraffitis(): Graffiti[] {
		let graffitiList = [
			{
				id: 1,
				name: 'Graffiti name 1',
				title: 'Graffiti title 1',
				description: 'Graffiti description 1',
				authorId: 1,
				userId: 1,
				categoryId: 1,
				createdAt: new Date(),
				location: '54.660000,25.250000',
			},
			{
				id: 2,
				name: 'Graffiti name 2',
				title: 'Graffiti title 2',
				description: 'Graffiti description 2',
				authorId: 1,
				userId: 2,
				categoryId: 2,
				createdAt: new Date(),
				location: '54.670000,25.260000',
			},
			{
				id: 3,
				name: 'Graffiti name 3',
				title: 'Graffiti title 3',
				description: 'Graffiti description 3',
				authorId: 2,
				userId: 1,
				categoryId: 3,
				createdAt: new Date(),
				location: '54.680000,25.270000',
			},
			{
				id: 4,
				name: 'Graffiti name 4',
				title: 'Graffiti title 4',
				description: 'Graffiti description 4',
				authorId: 2,
				userId: 2,
				categoryId: null,
				createdAt: new Date(),
				location: '54.690000,25.280000',
			},
		];

		return graffitiList;
	}
}
