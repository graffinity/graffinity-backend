import {
	ForbiddenException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import argon2 from 'argon2';
import { RefreshToken } from 'aws-sdk/clients/ssooidc';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { LoginRequest } from './dto/request/login-request.dto';
import { SignUpRequest } from './dto/request/signup-request.dto';
import { JwtPayload } from './types';
import { Tokens } from './types/tokens.types';

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private prisma: PrismaService,
		private jwtService: JwtService,
	) {}

	async hashPassword(password: string) {
		return await argon2.hash(password, {
			hashLength: 24,
		});
	}

	async signup(request: SignUpRequest): Promise<Tokens> {
		let hash = await this.hashPassword(request.password);
		let user = await this.userService
			.create({
				...request,
				password: hash,
			})
			.catch((error) => {
				if (error instanceof PrismaClientKnownRequestError) {
					if (error.code === 'P2002') {
						throw new ForbiddenException('Username or email already exists');
					}
				}
				throw error;
			});

		let tokens = await this.getTokens(user.id, user.email);
		await this.updateRefreshToken(user.id, tokens.refreshToken);

		return tokens;
	}

	async login(request: LoginRequest) {
		let user = await this.validateUser(request);
		if (!user) {
			throw new UnauthorizedException('Wrong username or password');
		}

		let tokens = await this.getTokens(user.id, user.email);
		await this.updateRefreshToken(user.id, tokens.refreshToken);

		return tokens;
	}

	async logout(userId: number) {
		await this.prisma.user.updateMany({
			where: {
				id: userId,
				refreshToken: {
					not: null,
				},
			},
			data: {
				refreshToken: null,
			},
		});
		return true;
	}

	// async isLoggedIn(request: any) {
	// 	return request.user != null;
	// }

	async validateUser(request: LoginRequest): Promise<User> {
		let user =
			(await this.userService.findByUsername(request.loginBy.username)) ||
			(await this.userService.findByEmail(request.loginBy.email));

		if (!user) {
			throw new NotFoundException('User not found');
		}
		let isPasswordValid = await argon2.verify(user.password, request.password);
		if (!isPasswordValid) {
			throw new UnauthorizedException('Wrong username or password');
		}
		return user;
	}

	async refreshTokens(userId: number, refreshToken: string) {
		let user = await this.userService.findById(userId);
		if (!user || !user.refreshToken) {
			throw new NotFoundException('User not found');
		}

		let isRefreshTokenValid = await argon2.verify(
			user.refreshToken,
			refreshToken,
		);
		if (!isRefreshTokenValid) {
			throw new ForbiddenException('Access denied');
		}

		let tokens = await this.getTokens(user.id, user.email);
		await this.updateRefreshToken(user.id, tokens.refreshToken);

		return tokens;
	}

	async updateRefreshToken(
		userId: number,
		refreshToken: string,
	): Promise<void> {
		let hash = await this.hashPassword(refreshToken);

		await this.prisma.user.update({
			where: {
				id: userId,
			},
			data: {
				refreshToken: hash,
			},
		});
	}

	async getTokens(userId: number, email: string) {
		let jwtPayload: JwtPayload = {
			sub: userId,
			email,
		};

		const [accessToken, refreshToken] = await Promise.all([
			this.jwtService.signAsync(jwtPayload, {
				secret: process.env.JWT_ACCESS_TOKEN_SECRET,
				expiresIn: 60 * 60, // 1 hour
			}),

			this.jwtService.signAsync(jwtPayload, {
				secret: process.env.JWT_REFRESH_TOKEN_SECRET,
				expiresIn: 60 * 60 * 24 * 14, // 2 weeks
			}),
		]);

		return {
			accessToken: accessToken,
			refreshToken: refreshToken,
		};
	}
}
