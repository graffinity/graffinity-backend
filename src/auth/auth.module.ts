import { Global, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './strategies/access-token.strategy';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { SignupStrategy } from './strategies/signup.strategy';

@Global()
@Module({
	imports: [
		UserModule,
		PassportModule,
		ConfigModule,
		JwtModule.register({
			secret: jwtConstants.secret,
			signOptions: { expiresIn: '3600s' },
		}),
	],
	providers: [
		ConfigService,
		AuthService,
		LocalStrategy,
		JwtStrategy,
		AccessTokenStrategy,
		SignupStrategy,
		RefreshTokenStrategy,
		UserService,
		JwtService,
	],
	controllers: [AuthController],
	exports: [AuthService],
})
export class AuthModule {}
