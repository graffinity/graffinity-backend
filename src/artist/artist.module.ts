import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserRoleService } from '../userrole/userrole.service';

@Module({
	imports: [PrismaModule, ConfigModule, AuthModule],
	controllers: [ArtistController],
	providers: [
		ArtistService,
		AuthService,
		UserService,
		JwtService,
		UserRoleService,
	],
})
export class ArtistModule {}
