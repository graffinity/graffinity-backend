import { UserInfoResponse } from '../dto/response/user-info-response.dto';
import { UserEntity } from '../entities/user.entity';

const UserMapper = {
	toResponse: (entity: UserEntity) => {
		let response: UserInfoResponse = {
			name: entity.name,
			lastname: entity.lastname,
			email: entity.email,
			username: entity.username,
		};

		return response;
	},
	toResponses: (entities: UserEntity[]) => {
		return entities.map((entity) => UserMapper.toResponse(entity));
	},
};

export default UserMapper;
