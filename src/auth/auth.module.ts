import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './strategies/access-token.strategy';

import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

@Module({
	imports: [UserModule, PassportModule, PrismaModule],
	providers: [
		AuthService,
		AccessTokenStrategy,
		RefreshTokenStrategy,
		UserService,
	],
	controllers: [AuthController],
	exports: [AuthService],
})
export class AuthModule {}
