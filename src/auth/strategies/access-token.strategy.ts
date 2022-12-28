import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-local';
import { JwtPayload } from '../types';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
	Strategy,
	'jwt-access-token',
) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secret: process.env.JWT_ACCESS_TOKEN_SECRET,
		});
	}

	validate(payload: JwtPayload) {
		return payload;
	}
}
