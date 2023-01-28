import {
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from './auth.service';
import GetCurrentUserId from './decorators/get-current-user-id.decorator';
import GetCurrentUser from './decorators/get-current-user.decorator';
import Public from './decorators/public.decorator';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local.guard';
import RtGuard from './guards/refresh-token.guard';
import { SignupAuthGuard } from './guards/signup.guard';
import { Tokens } from './types';

@ApiTags('auth')
@Controller('api/v1/auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Public()
	@Post('signup')
	@UseGuards(SignupAuthGuard)
	signup(@Req() request: Request): Promise<Tokens> {
		return this.authService.signup(request);
	}

	@Post('login')
	@UseGuards(LocalAuthGuard)
	login(@Req() request: Request) {
		return this.authService.login2(request);
	}

	@Get('profile')
	@UseGuards(JwtAuthGuard)
	getProfile(@Req() req: Request) {
		return req.user;
	}

	@Post('logout')
	@HttpCode(HttpStatus.OK)
	logout(@GetCurrentUserId() userId: number): Promise<boolean> {
		if (!userId) {
			return Promise.resolve(false);
		}
		return this.authService.logout(userId);
	}

	@Public()
	@Get('status')
	async getStatus(@Req() request: Request) {
		if (request.headers.authorization) {
			let access_token = request.headers.authorization.split(' ')[1];
			let isLoggedIn = await this.authService.isUserLoggedIn(access_token);
			return { isLoggedIn: isLoggedIn };
		}
		return { isLoggedIn: false };
	}

	@Public()
	@UseGuards(RtGuard)
	@Post('refresh')
	@HttpCode(HttpStatus.OK)
	refreshTokens(
		@GetCurrentUserId() userId: number,
		@GetCurrentUser('refreshToken') refreshToken: string,
	): Promise<Tokens> {
		return this.authService.refreshTokens(userId, refreshToken);
	}
}
