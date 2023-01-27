import { ConflictException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Strategy } from 'passport-local';
import { UserService } from '../../user/user.service';
import { AuthService } from '../auth.service';
import { SignUpRequest } from '../dto/request/signup-request.dto';
import { jwtConstants } from '../constants';

@Injectable()
export class SignupStrategy extends PassportStrategy(Strategy, 'signup') {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UserService,
	) {
		super({
			usernameField: 'username',
			nameField: 'name',
			lastnameField: 'lastname',
			emailField: 'email',
			passwordField: 'password',
			passReqToCallback: true,
		});
	}

	// name: string,
	// lastname: string,
	// username: string,
	// email: string,
	// password: string,
	async validate(req: any): Promise<any> {
		console.log('validate: ', req);
		let hash = await this.authService.hashPassword(req.body.password);
		let user = await this.userService
			.create({
				name: req.body.name,
				lastname: req.body.lastname,
				email: req.body.email,
				username: req.body.username,
				password: hash,
			})
			.catch((error) => {
				if (error instanceof PrismaClientKnownRequestError) {
					if (error.code === 'P2002') {
						throw new ConflictException('Username or email already exists');
					}
				}
				throw new Error(error);
			});

		return user;
	}
}
