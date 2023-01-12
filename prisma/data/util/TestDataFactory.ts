import {
	PrismaClient,
	Category,
	CategoryToGraffiti,
	Graffiti,
	User,
	Artist,
	ArtistToGraffiti,
	GraffitiPhoto,
	Comment,
} from '@prisma/client';
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

	// --------------------------------
	// User test data
	public getValidUser(): User {
		let newUser: User = {
			id: 3,
			name: 'Mary',
			lastname: 'Doe',
			username: 'marydoe',
			email: 'marydoe@gmail.com',
			password: 'password',
			refreshToken: 'some-refresh',
		};

		return newUser;
	}

	public async getValidUserWithHashedPassword(): Promise<User> {
		let hashedPassword = await argon2.hash('password');

		let newUser: User = {

			id: 4,
			name: 'Mary',
			lastname: 'Doe',
			username: 'marydoe',
			email: 'marydoe@gmail.com',
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
				email: "graffinity.bot@gmail.com",
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
			id: 26,
			name: '',

			description: '',
			authorId: 1,

			createdAt: new Date(),
			latitude: '',
			longitude: '',
		};
		return newGraffiti;
	}

	public getValidGraffitiWithCategory(): Graffiti {
		let newGraffiti: Graffiti = {
			id: 27,
			name: '',
			description: '',
			authorId: 1,
			createdAt: new Date(),
			latitude: '',
			longitude: '',
		};

		return newGraffiti;
	}

	public getListOfGraffitis(): Graffiti[] {
		let graffitiList: Graffiti[] = [
			{
				id: 1,
				name: 'Graffiti name 1',
				description: 'Graffiti description 1',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.671517 ',
				longitude: '25.279855',
			},
			{
				id: 2,
				name: 'Graffiti name 2',
				description: 'Graffiti description 2',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.672498',
				longitude: '25.279901',
				
			},
			{
				id: 3,
				name: 'Graffiti name 3',
				description: 'Graffiti description 3',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.692858',
				longitude: '25.267214',
			},
			{
				id: 4,
				name: 'Graffiti name 4',
				description: 'Graffiti description 4',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.692583',
				longitude: '25.265747',
			},
			{
				id: 5,
				name: 'Grffiti name 5',
				description: 'Graffiti description 5',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.692608',
				longitude: '25.265650',
			},
			{
				id: 6,
				name: 'Graffiti name 6',
				description: 'Graffiti description 6',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.688846',
				longitude: '25.258051',
			},
			{
				id: 7,
				name: 'Graffiti name 7',
				description: 'Graffiti description 7',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.696029',
				longitude: '25.263620',
			},
			{
				id: 8,
				name: 'Graffiti name 8',
				description: 'Graffiti description 8',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.694989',
				longitude: '25.263847',
			},
			{
				id: 9,
				name: 'Graffiti name 9',
				description: 'Graffiti description 9',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.694997',
				longitude: '25.264181',
			},
			{
				id: 10,
				name: 'Graffiti name 10',
				description: 'Graffiti description 10',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.694997',
				longitude: '25.264181',
			},
			{
				id: 11,
				name: 'Graffiti name 11',
				description: 'Graffiti description 11',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.694983',
				longitude: '25.263996',
			},
			{
				id: 12,
				name: 'Graffiti name 12',
				description: 'Graffiti description 12',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.694983',
				longitude: '25.263996',
			},
			{
				id: 13,
				name: 'Graffiti name 13	',
				description: 'Graffiti description 13',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.694989',
				longitude: '25.263847',
			},
			{
				id: 14,
				name: 'Graffiti name 14',
				description: 'Graffiti description 14',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.694719',
				longitude: '25.264284',
			},
			{
				id: 15,
				name: 'Graffiti name 15',
				description: 'Graffiti description 15',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.695357',
				longitude: '25.26415',
			},
			{
				id: 16,
				name: 'Graffiti name 16',
				description: 'Graffiti description 16',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.695342',
				longitude: '25.263792',
			},
			{
				id: 17,
				name: 'Graffiti name 17',
				description: 'Graffiti description 17',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.695342',
				longitude: '25.263980',
			},
			{
				id: 18,
				name: 'Graffiti name 18',
				description: 'Graffiti description 18',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.695385',
				longitude: '25.264165',
			},
			{
				id: 19,
				name: 'Graffiti name 19',
				description: 'Graffiti description 19',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.695373',
				longitude: '25.263972',
			},
			{
				id: 20,
				name: 'Graffiti name 20',
				description: 'Graffiti description 20',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.695349',
				longitude: '25.263787',
			},
			{
				id: 21,
				name: 'Graffiti name 21',
				description: 'Graffiti description 21',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.689126',
				longitude: '25.262636',
			},
			{
				id: 22,
				name: 'Graffiti name 22',
				description: 'Graffiti description 22',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.688933',
				longitude: '25.262175',
			},
			{
				id: 23,
				name: 'Graffiti name 23',
				description: 'Graffiti description 23',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.696029',
				longitude: '25.263925',
			},
			{
				id: 24,
				name: 'Graffiti name 24',
				description: 'Graffiti description 24',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.694984',
				longitude: '25.264010',
			},
			{
				id: 25,
				name: 'Graffiti name 25',
				description: 'Graffiti description 25',
				authorId: 1,
				createdAt: new Date(),
				latitude: '54.69605174048014',
				longitude: '25.26408561972244',
			},
		];

		return graffitiList;
	}

	// --------------------------------
	// Grafitti-To-Category test data

	public getValidGraffitiToCategory(): CategoryToGraffiti {
		let newCategoryToGraffiti: CategoryToGraffiti = {
			id: 1,
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
				id: 1,
				artistId: 1,
				graffitiId: 1,
			},
			{
				id: 2,
				artistId: 1,
				graffitiId: 2,
			},
			{
				id: 3,
				artistId: 1,
				graffitiId: 3,
			},
			{
				id: 4,
				artistId: 1,
				graffitiId: 4,
			},
			{
				id: 5,
				artistId: 1,
				graffitiId: 5,
			},
			{
				id: 6,
				artistId: 1,
				graffitiId: 6,
			},
			{
				id: 7,
				artistId: 1,
				graffitiId: 7,
			},
			{
				id: 8,
				artistId: 1,
				graffitiId: 8,
			},
			{
				id: 9,
				artistId: 1,
				graffitiId: 9,
			},
			{
				id: 10,
				artistId: 1,
				graffitiId: 10,
			},
			{
				id: 11,
				artistId: 1,
				graffitiId: 11,
			},
			{
				id: 12,
				artistId: 1,
				graffitiId: 12,
			},
			{
				id: 13,
				artistId: 1,
				graffitiId: 13,
			},
			{
				id: 14,
				artistId: 1,
				graffitiId: 14,
			},
			{
				id: 15,
				artistId: 1,
				graffitiId: 15,
			},
			{
				id: 16,
				artistId: 1,
				graffitiId: 16,
			},
			{
				id: 17,
				artistId: 1,
				graffitiId: 17,
			},
			{
				id: 18,
				artistId: 1,
				graffitiId: 18,
			},
			{
				id: 19,
				artistId: 1,
				graffitiId: 19,
			},
			{
				id: 20,
				artistId: 1,
				graffitiId: 20,
			},
			{
				id: 21,
				artistId: 1,
				graffitiId: 21,
			},
			{
				id: 22,
				artistId: 1,
				graffitiId: 22,
			},
			{
				id: 23,
				artistId: 1,
				graffitiId: 23,
			},
			{
				id: 24,
				artistId: 1,
				graffitiId: 24,
			},
			{
				id: 25,
				artistId: 1,
				graffitiId: 25,
			},
			{
				id: 26,
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
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9493.HEIC',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 0,
			},
			{
				id: 2,
				graffitiId: 1, 
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9494.HEIC',
				addedAt: new Date(),
				userId: 2,
				pictureScore: 0,
			},
			{
				id: 3,
				graffitiId: 2, 
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9496.HEIC',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 0,
			},
			{
				id: 4,
				graffitiId: 2, 
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9495.HEIC',
				addedAt: new Date(),
				userId: 2,
				pictureScore: 0,
			},
			{
				id: 5,
				graffitiId: 3, 
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9503.HEIC',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 0,
			},
			{
				id: 6,
				graffitiId: 4, 
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9505.JPG',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 0,
			},
			{
				id: 7,
				graffitiId: 4, 
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9504.JPG',
				addedAt: new Date(),
				userId: 2,
				pictureScore: 0,
			},
			{
				id: 8,
				graffitiId: 5, 
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9507.JPG',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 0,
			},
			{
				id: 9,
				graffitiId: 5, 
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9506.JPG',
				addedAt: new Date(),
				userId: 2,
				pictureScore: 0,
			},
			{
				id: 10,
				graffitiId: 6, 
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9182.HEIC',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 0,
			},
			{
				id: 11,
				graffitiId: 6, 
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9183.HEIC',
				addedAt: new Date(),
				userId: 2,
				pictureScore: 0,
			},
			{
				id: 12,
				graffitiId: 7, 
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9192.HEIC',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 0,
			},
			{
				id: 13,
				graffitiId: 8, 
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9206.HEIC',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 0,
			},
			{
				id: 14,
				graffitiId: 9, 
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9208.HEIC',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 0,
			},
			{
				id: 15,
				graffitiId: 9, 
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9210.HEIC',
				addedAt: new Date(),
				userId: 2,
				pictureScore: 0,
			},
			{
				id: 16,
				graffitiId: 10, 
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9213.HEIC',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 0,
			},
			{
				id: 17,
				graffitiId: 11, 
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9211.HEIC',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 0,
			},
			{
				id: 18,
				graffitiId: 12, 
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9214.HEIC',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 0,
			},
			{
				id: 19,
				graffitiId: 13, 
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9215.HEIC',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 0,
			},
			{
				id: 20,
				graffitiId: 14, 
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9216.HEIC',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 0,
			},
			{
				id: 21,
				graffitiId: 15, 
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9219.HEIC',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 0,
			},
			{
				id: 22,
				graffitiId: 16, 
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9223.HEIC',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 0,
			},
			{
				id: 23,
				graffitiId: 17, 
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9224.HEIC',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 0,
			},
			{
				id: 24,
				graffitiId: 18, 
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9226.HEIC',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 0,
			},
			{
				id: 25,
				graffitiId: 19, 
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9227.HEIC',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 0,
			},
			{
				id: 26,
				graffitiId: 20, 
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9229.HEIC',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 0,
			},
			{
				id: 27,
				graffitiId: 21, 
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9230.HEIC',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 0,
			},
			{
				id: 28,
				graffitiId: 22, 
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9232.HEIC',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 0,
			},
			{
				id: 29,
				graffitiId: 23, 
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9228.HEIC',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 0,
			},
			{
				id: 30,
				graffitiId: 24, 
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9207.HEIC',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 0,
			},
			{
				id: 31,
				graffitiId: 25, 
				url: 'https://graffinity-images.s3.eu-central-1.amazonaws.com/IMG_9203.HEIC',
				addedAt: new Date(),
				userId: 1,
				pictureScore: 0,
			},

		];
		return GraffitiPhotoList;
	}
}
