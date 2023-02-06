import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';
import { JwtPayload } from '../types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: jwtConstants.secret,
		});
	}

	async validate(payload: any) {
		let response: JwtPayload = {
			sub: payload.sub,
			isLoggedIn: payload.isLoggedIn,
			userId: payload.userId,
			username: payload.username,
			isAdmin: payload.isAdmin,
			email: payload.email,
		};
		return response;
	}
}
