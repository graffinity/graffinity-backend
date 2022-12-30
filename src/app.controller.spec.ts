import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { PrismaService } from './prisma/prisma.service';
import { UserService } from './user/user.service';
import { MetadataServiceJS } from './metadata/metadata.servicejs';
import { MetadataService } from './metadata/metadata.service';

const appServiceMock = {
	getHello: jest.fn().mockImplementation(() => 'Hello World!'),
};

describe('AppController', () => {
	let appController: AppController;
	let appService: AppService;

	beforeEach(async () => {
		const moduleRef: TestingModule = await Test.createTestingModule({
			controllers: [AppController],
			providers: [
				{
					provide: AppService,
					useValue: appServiceMock,
				},
				AuthService,
				JwtService,
				UserService,
				PrismaService,
				MetadataServiceJS,
				MetadataService,
			],
		}).compile();

		appService = moduleRef.get<AppService>(AppService);
		appController = moduleRef.get<AppController>(AppController);
	});

	describe('root', () => {
		it('should return "Hello World!"', () => {
			expect(appController.getHello()).toBe('Hello World!');
			expect(appService.getHello).toHaveBeenCalled();
		});
	});

	// describe('root', () => {
	// 	it('should return "Hello World!"', () => {
	// 		expect(appController.getHello()).toBe('Hello World!');
	// 	});
	// });
});
