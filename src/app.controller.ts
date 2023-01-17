import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';

import { UserService } from './user/user.service';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	// @UseGuards(LocalAuthGuard)
	// @Post('api/v1/auth/login')
	// async login(@Request() req: any, @Body() request: LoginRequest) {
	// 	let user = await this.authService.validateUser(request);
	// 	if (user !== null) {
	// 		let token = await this.authService.login(request);

	// 		return {
	// 			access_token: token.accessToken,
	// 			success: token.accessToken !== undefined,
	// 		};
	// 	}
	// 	return {
	// 		access_token: undefined,
	// 		success: false,
	// 	};
	// }

	// // @UseGuards(AuthenticatedGuard)
	// @Get('api/v1/auth/status')
	// async getStatus(@Request() req: any) {
	// 	if (req.user) {
	// 		let status: StatusResponse = {
	// 			isLoggedIn: true,
	// 		};
	// 		return status;
	// 	}
	// 	let status: StatusResponse = {
	// 		isLoggedIn: false,
	// 	};
	// 	return status;
	// }

	// @UseGuards(JwtAuthGuard)
	// @Get('/api/v1/profile')
	// async getProfile(@Body() request: LoginRequest) {
	// 	let user = await this.userService.findByUsername(request.loginBy.username);
	// 	if (!user) {
	// 		return UserMapper.toResponse(user);
	// 	}
	// 	return null;
	// }
}
