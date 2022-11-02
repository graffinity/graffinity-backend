import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserEntity } from "../user/entities/user.entity";
import { UserService } from "../user/user.service";
import { LoginRequest } from "./dto/request/login-request.dto";

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
	) {}

	async validateUser(request: LoginRequest): Promise<any> {
		const user = await this.userService.findByUsername(request.username);

		if (user && user.password === request.password) {
			const { password, ...result } = user;
			return result;
		}
		return null;
	}

	async isLoggedIn(request: any) {
		return request.user != null;
	}

	async login(user: UserEntity) {
		const payload = { username: user.username, sub: user.id };
		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}
