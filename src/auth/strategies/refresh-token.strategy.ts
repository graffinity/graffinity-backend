import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-local';
import { Request } from 'express';
import { JwtPayload, JwtPayloadWithRefreshToken } from '../types';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
	Strategy,
	'jwt-refresh-token',
) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secret: process.env.JWT_REFRESH_TOKEN_SECRET,
			passReqToCallback: true,
		});
	}

	validate(request: Request, payload: JwtPayload): JwtPayloadWithRefreshToken {
		const refreshToken = request
			?.get('authorization')
			?.replace('Bearer ', '')
			.trim();

		if (!refreshToken) throw new ForbiddenException('Refresh token malformed');
		return { ...payload, refreshToken };
	}
}
