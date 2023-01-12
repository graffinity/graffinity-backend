import { Category, CategoryToGraffiti, Graffiti, User } from '@prisma/client';
import argon2 from 'argon2';
import { CreateGraffitiDto } from '../../../graffiti/dto/request/create-graffiti.dto';
import GraffitiStatus from '../../../graffiti/entities/graffiti-status.enum';

export class TestDataFactory {
	private static instance: TestDataFactory;
	private constructor() {}

	public static getInstance(): TestDataFactory {
		if (!TestDataFactory.instance) {
			TestDataFactory.instance = new TestDataFactory();
		}
		return TestDataFactory.instance;
	}

	// --------------------------------
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

	// --------------------------------
	// Category test data
	public getValidCategory(): Category {
		let newCategory: Category = {
			id: 1,
			name: 'Category',
		};

		return newCategory;
	}

	public getListOfCategories(): Category[] {
		let categories: Category[] = [
			{
				id: 1,
				name: 'Category 1',
			},
			{
				id: 2,
				name: 'Category 2',
			},
			{
				id: 3,
				name: 'Category 3',
			},
		];

		return categories;
	}

	// --------------------------------
	// Graffiti test data
	public getValidGraffiti(): Graffiti {
		let newGraffiti = {
			id: 1,
			name: 'Graffiti name 1',

			description: 'Graffiti description 1',
			authorId: 1,

			createdAt: new Date(),
			location: '54.687000,25.279000',
			status: GraffitiStatus.SUBMITTED,
			// Change location from string to LatLng
			// latitude: 54.687157,
			// longitude: 25.279652,
		};
		return newGraffiti;
	}

	public getValidGraffitiWithCategory(): Graffiti {
		let newGraffiti: Graffiti = {
			id: 1,
			name: 'Graffiti name 1',
			description: 'Graffiti description 1',
			status: GraffitiStatus.PENDING,
			authorId: 1,
			createdAt: new Date(),
			location: '54.687000,25.279000',
		};

		return newGraffiti;
	}

	public getListOfGraffitis(): CreateGraffitiDto[] {
		let graffitiList: CreateGraffitiDto[] = [
			{
				name: 'Graffiti name 1',
				description: 'Graffiti description 1',
				authorId: 1,
				createdAt: new Date(),
				location: '54.660000,25.250000',
				categoryIds: [],
				artistIds: [],
			},
			{
				name: 'Graffiti name 2',
				description: 'Graffiti description 2',
				authorId: 1,
				createdAt: new Date(),
				location: '54.670000,25.260000',
				categoryIds: [],
				artistIds: [],
			},
			{
				name: 'Graffiti name 3',
				description: 'Graffiti description 3',
				authorId: 2,
				createdAt: new Date(),
				location: '54.680000,25.270000',
				categoryIds: [],
				artistIds: [],
			},
			{
				name: 'Graffiti name 4',
				description: 'Graffiti description 4',
				authorId: 2,
				createdAt: new Date(),
				location: '54.690000,25.280000',
				categoryIds: [],
				artistIds: [],
			},
		];

		return graffitiList;
	}

	// --------------------------------
	// Grafitti-To-Category test data

	public getValidGraffitiToCategory(): CategoryToGraffiti {
		let newCategoryToGraffiti: CategoryToGraffiti = {
			categoryId: 1,
			graffitiId: 1,
		};

		return newCategoryToGraffiti;
	}
}
