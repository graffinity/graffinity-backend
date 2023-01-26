import {
	Artist,
	ArtistToGraffiti,
	Category,
	CategoryToGraffiti,
	Graffiti,
	GraffitiPhoto,
	GraffitiStatus,
	User,
} from '@prisma/client';
import argon2 from 'argon2';
import { Request } from 'express';
import { CreateCategoryDto } from '../../../src/category/dto/request/create-category.dto';
import { CategoryResponseDto } from '../../../src/category/dto/response/category-response.dto';
import { CreateGraffitiDto } from '../../../src/graffiti/dto/request/create-graffiti.dto';
import { GraffitiResponseDto } from '../../../src/graffiti/dto/response/graffiti-response.dto';

export class DataFactory {
	public static instance: DataFactory;
	public constructor() {}

	public static getInstance(): DataFactory {
		if (!DataFactory.instance) {
			DataFactory.instance = new DataFactory();
		}
		return DataFactory.instance;
	}

	// --------------------------------
	// User test data

	public async getValidUser(): Promise<User> {
		let hashedPassword = await argon2.hash('password');
		let newUser: User = {
			id: 3,
			name: 'Mary',
			lastname: 'Doe',
			username: 'marydoe',
			email: 'marydoe@gmail.com',
			password: hashedPassword,
			refreshToken: 'some-refresh',
		};

		return newUser;
	}

	public async getValidUserWithHashedPassword(): Promise<User> {
		let hashedPassword = await argon2.hash('password');

		let newUser: User = {
			id: 4,
			name: 'John',
			lastname: 'Doe',
			username: 'johndoe',
			email: 'johndoe@gmail.com',
			password: hashedPassword,
			refreshToken: 'some-refresh',
		};

		return newUser;
	}

	public async getListofUsersWithHashedPassword(): Promise<User[]> {
		let hashedPassword = await argon2.hash('password');

		let userList: User[] = [
			{
				id: 1,
				name: 'Bob',
				lastname: 'Rob',
				username: 'graffinity_bot',
				email: 'graffinity.bot@gmail.com',
				password: hashedPassword,
				refreshToken: 'some-refresh',
			},
			{
				id: 2,
				name: 'Camera',
				lastname: 'Woman',
				username: 'DesignatedCameraWoman',
				email: 'kasyra@gmail.com',
				password: hashedPassword,
				refreshToken: 'some-refresh',
			},
		];

		return userList;
	}

	// --------------------------------
	// Category test data
	public getValidCategory(): Category {
		let newCategory: Category = {
			id: 4,
			name: 'Category',
		};

		return newCategory;
	}

	public getValidCategoryResponse(): CategoryResponseDto {
		let response = {
			id: 5,
			name: 'Category 5',
		};
		return response;
	}

	public getValidCategoryCreateRequest(): CreateCategoryDto {
		let request: CreateCategoryDto = {
			name: 'Category 6',
			graffitiIds: [],
		};
		return request;
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
	graffiti = {};
	public getValidGraffiti(): Graffiti {
		let newGraffiti: Graffiti = {
			id: 26,
			name: 'Graffiti name 26',
			description: 'Graffiti description 26',
			authorId: 1,
			createdAt: new Date(),
			status: GraffitiStatus.SUBMITTED,
			address: 'Graffiti address 26',
			latitude: '54.671517',
			longitude: '25.279855',
		};
		return newGraffiti;
	}

	public getValidCreateGraffitiRequest(): CreateGraffitiDto {
		let newGraffiti: CreateGraffitiDto = {
			name: 'Graffiti name 26',
			description: 'Graffiti description 26',
			authorId: 1,
			createdAt: new Date(),
			categoryIds: [],
			address: 'Graffiti address',
			artistIds: [],
			latitude: '54.671517',
			longitude: '25.279855',
		};

		return newGraffiti;
	}

	public getValidGraffitiWithPhotos(): Graffiti & { photos: GraffitiPhoto[] } {
		let newGraffiti: Graffiti & { photos: GraffitiPhoto[] } = {
			id: 28,
			name: 'Graffiti name 28',
			description: 'Graffiti description 28',
			authorId: 1,
			createdAt: new Date(),
			status: GraffitiStatus.SUBMITTED,
			latitude: '54.671517',
			longitude: '25.279855',
			address: 'Graffiti address 28',
			photos: [
				{
					id: 1,
					url: 'https://graffinity.s3.eu-central-1.amazonaws.com/graffiti_photos/1.jpg',
					graffitiId: 28,
					addedAt: new Date(),
					userId: 1,
					pictureScore: 100,
				},
			],
		};

		return newGraffiti;
	}

	public getValidGraffitiWithCategory(): Graffiti {
		let newGraffiti: Graffiti = {
			id: 27,
			name: 'Graffiti name 27',
			description: 'Grffiti description 27',
			authorId: 1,
			createdAt: new Date(),
			status: GraffitiStatus.SUBMITTED,
			latitude: '54.671517',
			longitude: '25.279855',
			address: 'Graffiti address 27',
		};

		return newGraffiti;
	}

	public getListOfGraffitiCreateRequests(): CreateGraffitiDto[] {
		let graffitiList: CreateGraffitiDto[] = [
			{
				name: 'Graffiti name 1',
				description: 'Graffiti description 1',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.671517 ',
				longitude: '25.279855',
				categoryIds: [],
				address: 'Graffiti address 1',
				artistIds: [],
			},
			{
				name: 'Graffiti name 2',
				description: 'Graffiti description 2',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.672498',
				longitude: '25.279901',
				categoryIds: [],
				address: 'Graffiti address 2',
				artistIds: [],
			},
			{
				name: 'Graffiti name 3',
				description: 'Graffiti description 3',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.692858',
				longitude: '25.267214',
				categoryIds: [],
				address: 'Graffiti address 3',
				artistIds: [],
			},
			{
				name: 'Graffiti name 4',
				description: 'Graffiti description 4',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.692583',
				longitude: '25.265747',
				categoryIds: [],
				address: 'Graffiti address 4',
				artistIds: [],
			},
			{
				name: 'Grffiti name 5',
				description: 'Graffiti description 5',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.692608',
				longitude: '25.265650',
				categoryIds: [],
				address: 'Graffiti address 5',
				artistIds: [],
			},
			{
				name: 'Graffiti name 6',
				description: 'Graffiti description 6',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.688846',
				longitude: '25.258051',
				categoryIds: [],
				address: 'Graffiti address 6',
				artistIds: [],
			},
			{
				name: 'Graffiti name 7',
				description: 'Graffiti description 7',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.696029',
				longitude: '25.263620',
				categoryIds: [],
				address: 'Graffiti address 7',
				artistIds: [],
			},
			{
				name: 'Graffiti name 8',
				description: 'Graffiti description 8',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.694989',
				longitude: '25.263847',
				categoryIds: [],
				address: 'Graffiti address 8',
				artistIds: [],
			},
			{
				name: 'Graffiti name 9',
				description: 'Graffiti description 9',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.694997',
				longitude: '25.264181',
				categoryIds: [],
				address: 'Graffiti address 9',
				artistIds: [],
			},
			{
				name: 'Graffiti name 10',
				description: 'Graffiti description 10',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.694997',
				longitude: '25.264181',
				categoryIds: [],
				address: 'Graffiti address 10',
				artistIds: [],
			},
			{
				name: 'Graffiti name 11',
				description: 'Graffiti description 11',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.694983',
				longitude: '25.263996',
				categoryIds: [],
				address: 'Graffiti address 11',
				artistIds: [],
			},
			{
				name: 'Graffiti name 12',
				description: 'Graffiti description 12',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.694983',
				longitude: '25.263996',
				categoryIds: [],
				address: 'Graffiti address 12',
				artistIds: [],
			},
			{
				name: 'Graffiti name 13	',
				description: 'Graffiti description 13',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.694989',
				longitude: '25.263847',
				categoryIds: [],
				address: 'Graffiti address 13',
				artistIds: [],
			},
			{
				name: 'Graffiti name 14',
				description: 'Graffiti description 14',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.694719',
				longitude: '25.264284',
				artistIds: [],
				categoryIds: [],
				address: 'Graffiti address 14',
			},
			{
				name: 'Graffiti name 15',
				description: 'Graffiti description 15',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.695357',
				longitude: '25.26415',
				categoryIds: [],
				address: 'Graffiti address 15',
				artistIds: [],
			},
			{
				name: 'Graffiti name 16',
				description: 'Graffiti description 16',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.695342',
				longitude: '25.263792',
				categoryIds: [],
				address: 'Graffiti address 16',
				artistIds: [],
			},
			{
				name: 'Graffiti name 17',
				description: 'Graffiti description 17',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.695342',
				longitude: '25.263980',
				categoryIds: [],
				address: 'Graffiti address 17',
				artistIds: [],
			},
			{
				name: 'Graffiti name 18',
				description: 'Graffiti description 18',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.695385',
				longitude: '25.264165',
				categoryIds: [],
				address: 'Graffiti address 18',
				artistIds: [],
			},
			{
				name: 'Graffiti name 19',
				description: 'Graffiti description 19',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.695373',
				longitude: '25.263972',
				categoryIds: [],
				address: 'Graffiti address 19',
				artistIds: [],
			},
			{
				name: 'Graffiti name 20',
				description: 'Graffiti description 20',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.695349',
				longitude: '25.263787',
				categoryIds: [],
				address: 'Graffiti address 20',
				artistIds: [],
			},
			{
				name: 'Graffiti name 21',
				description: 'Graffiti description 21',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.689126',
				longitude: '25.262636',
				categoryIds: [],
				address: 'Graffiti address 21',
				artistIds: [],
			},
			{
				name: 'Graffiti name 22',
				description: 'Graffiti description 22',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.688933',
				longitude: '25.262175',
				categoryIds: [],
				address: 'Graffiti address 22',
				artistIds: [],
			},
			{
				name: 'Graffiti name 23',
				description: 'Graffiti description 23',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.696029',
				longitude: '25.263925',
				categoryIds: [],
				address: 'Graffiti address 23',
				artistIds: [],
			},
			{
				name: 'Graffiti name 24',
				description: 'Graffiti description 24',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.694984',
				longitude: '25.264010',
				categoryIds: [],
				address: 'Graffiti address 24',
				artistIds: [],
			},
			{
				name: 'Graffiti name 25',
				description: 'Graffiti description 25',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.69605174048014',
				longitude: '25.26408561972244',
				categoryIds: [],
				address: 'Graffiti address 25',
				artistIds: [],
			},
		];

		return graffitiList;
	}

	public getValidGraffitiResponse(): GraffitiResponseDto {
		let response: GraffitiResponseDto = {
			id: 1,
			name: 'Graffiti name 1',
			description: 'Graffiti description 1',
			authorId: 1,
			creationDate: new Date(),
			latitude: '54.695357',
			longitude: '25.26415',
			address: 'Graffiti address 1',
			photos: [],
		};

		return response;
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

	public getValidArtistList(): Artist[] {
		let ArtistList: Artist[] = [
			{
				id: 1,
				name: 'Unknown',
				surname: 'Artist',
			},
			{
				id: 2,
				name: 'Unknown',
				surname: 'Artist Too',
			},
		];
		return ArtistList;
	}

	// --------------------------------
	// Artist-to-Graffiti test data
	public getListOfArtistToGraffiti(): ArtistToGraffiti[] {
		let ArtistToGraffitiList: ArtistToGraffiti[] = [
			{
				artistId: 1,
				graffitiId: 1,
			},
			{
				artistId: 1,
				graffitiId: 2,
			},
			{
				artistId: 1,
				graffitiId: 3,
			},
			{
				artistId: 1,
				graffitiId: 4,
			},
			{
				artistId: 1,
				graffitiId: 5,
			},
			{
				artistId: 1,
				graffitiId: 6,
			},
			{
				artistId: 1,
				graffitiId: 7,
			},
			{
				artistId: 1,
				graffitiId: 8,
			},
			{
				artistId: 1,
				graffitiId: 9,
			},
			{
				artistId: 1,
				graffitiId: 10,
			},
			{
				artistId: 1,
				graffitiId: 11,
			},
			{
				artistId: 1,
				graffitiId: 12,
			},
			{
				artistId: 1,
				graffitiId: 13,
			},
			{
				artistId: 1,
				graffitiId: 14,
			},
			{
				artistId: 1,
				graffitiId: 15,
			},
			{
				artistId: 1,
				graffitiId: 16,
			},
			{
				artistId: 1,
				graffitiId: 17,
			},
			{
				artistId: 1,
				graffitiId: 18,
			},
			{
				artistId: 1,
				graffitiId: 19,
			},
			{
				artistId: 1,
				graffitiId: 20,
			},
			{
				artistId: 1,
				graffitiId: 21,
			},
			{
				artistId: 1,
				graffitiId: 22,
			},
			{
				artistId: 1,
				graffitiId: 23,
			},
			{
				artistId: 1,
				graffitiId: 24,
			},
			{
				artistId: 1,
				graffitiId: 25,
			},
			{
				artistId: 2,
				graffitiId: 25,
			},
		];

		return ArtistToGraffitiList;
	}

	public getListOfGraffitiPhotos(): GraffitiPhoto[] {
		let GraffitiPhotoList: GraffitiPhoto[] = [
			{
				id: 1,
				graffitiId: 1,
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9493.jpg',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 10,
			},
			{
				id: 2,
				graffitiId: 1,
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9494.jpg',
				addedAt: new Date(),
				userId: 2,
				pictureScore: 20,
			},
			{
				id: 3,
				graffitiId: 2,
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9496.jpg',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 30,
			},
			{
				id: 4,
				graffitiId: 2,
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9495.jpg',
				addedAt: new Date(),
				userId: 2,
				pictureScore: 40,
			},
			{
				id: 5,
				graffitiId: 3,
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9503.jpg',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 50,
			},
			{
				id: 6,
				graffitiId: 4,
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9505.jpg',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 60,
			},
			{
				id: 7,
				graffitiId: 4,
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9504.jpg',
				addedAt: new Date(),
				userId: 2,
				pictureScore: 70,
			},
			{
				id: 8,
				graffitiId: 5,
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9507.jpg',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 80,
			},
			{
				id: 9,
				graffitiId: 5,
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9506.jpg',
				addedAt: new Date(),
				userId: 2,
				pictureScore: 90,
			},
			{
				id: 10,
				graffitiId: 6,
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9182.jpg',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 100,
			},
			{
				id: 11,
				graffitiId: 6,
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9183.jpg',
				addedAt: new Date(),
				userId: 2,
				pictureScore: 110,
			},
			{
				id: 12,
				graffitiId: 7,
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9192.jpg',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 120,
			},
			{
				id: 13,
				graffitiId: 8,
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9206.jpg',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 130,
			},
			{
				id: 14,
				graffitiId: 9,
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9208.jpg',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 140,
			},
			{
				id: 15,
				graffitiId: 9,
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9210.jpg',
				addedAt: new Date(),
				userId: 2,
				pictureScore: 0,
			},
			{
				id: 16,
				graffitiId: 10,
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9213.jpg',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 0,
			},
			{
				id: 17,
				graffitiId: 11,
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9211.jpg',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 0,
			},
			{
				id: 18,
				graffitiId: 12,
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9214.jpg',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 0,
			},
			{
				id: 19,
				graffitiId: 13,
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9215.jpg',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 0,
			},
			{
				id: 20,
				graffitiId: 14,
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9216.jpg',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 0,
			},
			{
				id: 21,
				graffitiId: 15,
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9219.jpg',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 0,
			},
			{
				id: 22,
				graffitiId: 16,
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9223.jpg',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 0,
			},
			{
				id: 23,
				graffitiId: 17,
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9224.jpg',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 0,
			},
			{
				id: 24,
				graffitiId: 18,
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9226.jpg',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 0,
			},
			{
				id: 25,
				graffitiId: 19,
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9227.jpg',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 0,
			},
			{
				id: 26,
				graffitiId: 20,
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9229.jpg',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 0,
			},
			{
				id: 27,
				graffitiId: 21,
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9230.jpg',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 0,
			},
			{
				id: 28,
				graffitiId: 22,
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9232.jpg',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 0,
			},
			{
				id: 29,
				graffitiId: 23,
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9228.jpg',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 0,
			},
			{
				id: 30,
				graffitiId: 24,
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9207.jpg',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 0,
			},
			{
				id: 31,
				graffitiId: 25,
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9203.jpg',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 0,
			},
		];
		return GraffitiPhotoList;
	}

	public getValidExpressRequest(): Request {
		let req = {
			headers: {
				authorization: 'Bearer token',
			},
		} as Request;
		return req;
	}
}

export default DataFactory;
