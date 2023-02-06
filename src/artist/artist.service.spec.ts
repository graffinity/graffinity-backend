import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { ArtistService } from './artist.service';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserRoleService } from '../userrole/userrole.service';

describe('ArtistService', () => {
	let service: ArtistService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule, AuthModule],
			providers: [
				PrismaService,
				ArtistService,
				AuthService,
				UserService,
				UserRoleService,
				JwtService,
			],
		}).compile();

		service = module.get<ArtistService>(ArtistService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
