import {
	Body,
	Controller,
	Get,
	Post,
	Request,
	UseGuards,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { AuthService } from "./auth/auth.service";
import { LoginRequest } from "./auth/dto/request/login-request.dto";
import { StatusResponse } from "./auth/dto/response/status-response-dto";
import { AuthenticatedGuard } from "./auth/guards/authenticated.guard";
import { JwtAuthGuard } from "./auth/jwt-auth.guards";
import { LocalAuthGuard } from "./auth/local-auth.guard";
import UserMapper from "./user/mapper/UserMapper";
import { UserService } from "./user/user.service";

@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		private authService: AuthService,
		private userService: UserService,
	) {}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	@UseGuards(LocalAuthGuard)
	@Post("api/v1/auth/login")
	async login(@Request() req: any, @Body() request: LoginRequest) {
		let user = await this.authService.validateUser(request);
		if (user !== null) {
			let token = await this.authService.login(user);

			return {
				access_token: token.access_token,
				success: token.access_token !== undefined,
			};
		}
		return {
			access_token: undefined,
			success: false,
		};
	}

	// @UseGuards(AuthenticatedGuard)
	@Get("api/v1/auth/status")
	async getStatus(@Request() req: any) {
		if (req.user) {
			let status: StatusResponse = {
				isLoggedIn: true,
			};
			return status;
		}
		let status: StatusResponse = {
			isLoggedIn: false,
		};
		return status;
	}

	@UseGuards(JwtAuthGuard)
	@Get("/api/v1/profile")
	async getProfile(@Body() request: LoginRequest) {
		let user = await this.userService.findByUsername(request.username);
		if (user != null) {
			return UserMapper.toResponse(user);
		}
		return null;
	}
}
