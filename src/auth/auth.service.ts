import {
	BadRequestException,
	ForbiddenException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import argon2 from 'argon2';
import { Request } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { LoginRequest } from './dto/request/login-request.dto';
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

	async hash(token: string) {
		return await argon2.hash(token, {
			hashLength: 36,
		});
	}

	async signup(request: any): Promise<Tokens> {
		let user = request.user;
		let isUserAdmin = await this.isUserAdminByName(user.username);

		const payload: JwtPayload = {
			sub: user.id,
			userId: user.id,
			username: user.username,
			email: user.email,
			isAdmin: isUserAdmin ? true : false,
			isLoggedIn: true,
		};

		let tokens = await this.getTokens(payload);
		await this.updateRefreshToken(user.id, tokens.refresh_token);

		return tokens;
	}

	async login(request: LoginRequest) {
		let user = await this.validateUser(request);
		if (!user) {
			throw new UnauthorizedException('Wrong username or password');
		}

		let payload = this.getPayloadFromUser(user);
		let tokens = await this.getTokens(await payload);

		await this.updateRefreshToken(user.id, tokens.refresh_token);

		return tokens;
	}

	async login2(request: any) {
		let user = request.user;
		let isUserAdmin = await this.isUserAdminByName(user.username);

		const payload: JwtPayload = {
			sub: user.id,
			userId: user.id,
			username: user.username,
			email: user.email,
			isAdmin: isUserAdmin ? true : false,
			isLoggedIn: true,
		};

		let tokens: Tokens = await this.getTokens(payload);
		await this.updateRefreshToken(user.id, tokens.refresh_token);

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
	async isUserAdmin(userId: number) {
		return await this.userService.isUserAdmin(userId);
	}
	async isUserAdminByName(username: string) {
		return await this.userService.isUserAdminByName(username);
	}
	async isUserLoggedIn(access_token?: string): Promise<boolean> {
		let secret = process.env.JWT_ACCESS_TOKEN_SECRET;
		if (access_token) {
			let isLoggedIn = await this.jwtService
				.verifyAsync(access_token, {
					secret: secret,
				})
				.catch((err) => {
					return false;
				});
			if (isLoggedIn && isLoggedIn.isLoggedIn && isLoggedIn.userId !== null) {
				return true;
			}
		}
		return false;
	}

	async isLoggedIn(request: Request) {
		let access_token = request.headers['authorization']?.split(' ')[1];
		let secret = process.env.JWT_ACCESS_TOKEN_SECRET;
		if (access_token && secret) {
			let isLoggedin = await this.jwtService.verifyAsync(access_token, {
				secret: secret,
			});
			if (isLoggedin) {
				return true;
			}
		}
		return false;
	}

	getUserFromRequest = async (request: Request) => {
		if (!request.headers.authorization) {
			throw new UnauthorizedException('Unauthorized');
		}
		let access_token = request.headers.authorization.split(' ')[1];
		let secret = process.env.JWT_ACCESS_TOKEN_SECRET;

		let user: JwtPayload = this.jwtService.verify(access_token, {
			secret: secret,
		});

		if (!user || !user.isLoggedIn || !user.userId) {
			throw new UnauthorizedException('Unauthorized');
		}

		return user;
	};

	userAuthValidation = async (request: Request) => {
		let isUserLoggedIn = await this.isLoggedIn(request);
		if (!isUserLoggedIn) {
			throw new UnauthorizedException('User is not logged in');
		}

		let jwtPayload = await this.getUserFromRequest(request);
		if (!jwtPayload) {
			throw new UnauthorizedException('User is not logged in');
		}

		return jwtPayload;
	};

	async validateUser(request: LoginRequest): Promise<User> {
		let user = await this.userService.findByUsername(request.username);

		if (!user) {
			throw new NotFoundException(
				`User with the username ${request.username} was not found`,
			);
		}
		let isPasswordValid = await argon2.verify(user.password, request.password);
		if (!isPasswordValid) {
			throw new BadRequestException('Wrong username or password');
		}
		return user;
	}

	async validae(request: Request) {
		let user = await this.getUserFromRequest(request);
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

		let payload = this.getPayloadFromUser(user);
		let tokens = await this.getTokens(await payload);
		await this.updateRefreshToken(user.id, tokens.refresh_token);

		return tokens;
	}

	async updateRefreshToken(
		userId: number,
		refreshToken: string,
	): Promise<void> {
		let hash = await this.hash(refreshToken);

		await this.prisma.user.update({
			where: {
				id: userId,
			},
			data: {
				refreshToken: hash,
			},
		});
	}

	async getTokens(payload: JwtPayload): Promise<Tokens> {
		let [accessToken, refreshToken] = await Promise.all([
			this.jwtService.signAsync(payload, {
				secret: process.env.JWT_ACCESS_TOKEN_SECRET,
				expiresIn: 60 * 60, // 1 hour
			}),

			this.jwtService.signAsync(payload, {
				secret: process.env.JWT_REFRESH_TOKEN_SECRET,
				expiresIn: 60 * 60 * 24 * 14, // 2 weeks
			}),
		]);

		let tokens: Tokens = {
			access_token: accessToken,
			refresh_token: refreshToken,
		};
		return tokens;
	}

	async getPayloadFromUser(user: User): Promise<JwtPayload> {
		let isLoggedIn = user.refreshToken ? true : false;

		let isUserAdmin = await this.isUserAdminByName(user.username);

		let payload: JwtPayload = {
			sub: user.id,
			userId: user.id,
			username: user.username,
			email: user.email,
			isAdmin: isUserAdmin ? true : false,
			isLoggedIn: isLoggedIn,
		};
		return payload;
	}
}
