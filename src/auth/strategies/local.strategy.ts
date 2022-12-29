import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { LoginRequest } from '../dto/request/login-request.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
		super();
	}

	async validate(username: string, password: string): Promise<any> {
		console.log('LocalStrategy.validate()');
		let req: LoginRequest = {
			username: username,
			password: password,
		};
		const user = await this.authService.validateUser(req);
		if (!user) {
			throw new UnauthorizedException();
		}
		return user;
	}
}
