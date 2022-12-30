import { User } from '@prisma/client';
import { UserInfoResponse } from '../dto/response/user-info-response.dto';

const UserMapper = {
	toResponse: (entity: User) => {
		let response: UserInfoResponse = {
			id: entity.id,
			name: entity.name,
			lastname: entity.lastname,
			email: entity.email,
			username: entity.username,
		};

		return response;
	},
	toResponses: (entities: User[]) => {
		return entities.map((entity) => UserMapper.toResponse(entity));
	},
};

export default UserMapper;
