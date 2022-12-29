import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from '../../user/user.service';
import { AuthService } from '../auth.service';
import { LoginRequest } from '../dto/request/login-request.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local-login') {
	constructor(private authService: AuthService) {
		super({ usernameField: 'email' });
	}

	async validate(request: LoginRequest) {
		let user = await this.authService.validateUser(request);

		if (user == null) {
			throw new UnauthorizedException();
		}
		return user;
	}
}
