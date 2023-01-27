import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../types';

export const GetCurrentUserId = createParamDecorator(
	(_: undefined, context: ExecutionContext): number | null => {
		const request = context.switchToHttp().getRequest();
		const user = request.user as JwtPayload;
		if (!user) {
			console.log('GetCurrentUserId: user is null');
			return null;
		}

		return user.userId;
	},
);

export default GetCurrentUserId;
