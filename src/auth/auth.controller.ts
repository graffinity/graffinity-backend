import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	Res,
	UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignUpRequest } from './dto/request/signup-request.dto';
import { Tokens } from './types';
import { LoginRequest } from './dto/request/login-request.dto';
import GetCurrentUserId from './decorators/get-current-user-id.decorator';
import Public from './decorators/public.decorator';
import RtGuard from './guards/refresh-token.guard';
import { Response, Request } from 'express';
import GetCurrentUser from './decorators/get-current-user.decorator';
import AtGuard from './guards/access-token.guard';
import { LocalAuthGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';

@ApiTags('auth')
@Controller('api/v1/auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Public()
	@Post('signup')
	@HttpCode(HttpStatus.CREATED)
	signup(@Body() dto: SignUpRequest): Promise<Tokens> {
		return this.authService.signup(dto);
	}

	// @Public()
	// @Post('login')
	// @HttpCode(HttpStatus.OK)
	// login(@Body() dto: LoginRequest): Promise<Tokens> {
	// 	return this.authService.login(dto);
	// }

	@UseGuards(LocalAuthGuard)
	@Post('login')
	login(@Req() req: Request) {
		return this.authService.login2(req.user);
	}

	@UseGuards(JwtAuthGuard)
	@Get('profile')
	getProfile(@Req() req: Request) {
		console.log('getProfile req', req);
		return req.user;
	}

	@Post('logout')
	@HttpCode(HttpStatus.OK)
	logout(@GetCurrentUserId() userId: number): Promise<boolean> {
		return this.authService.logout(userId);
	}

	@Public()
	getStatus() {}

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
