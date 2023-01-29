import GraffitiPhotoMapper from '../../graffitiphoto/mapper/GraffitiPhotoMapper';
import { GraffitiResponseDto } from '../dto/response/graffiti-response.dto';
import { GraffitiEntity } from '../entities/graffiti.entity';

const GraffitiMapper = {
	toResponse: (entity: GraffitiEntity) => {
		let response: GraffitiResponseDto = {
			id: entity.id,
			name: entity.name,
			description: entity.description,
			latitude: entity.latitude,
			longitude: entity.longitude,
			address: entity.address,
			authorId: entity.authorId,
			creationDate: entity.createdAt,
			photos: GraffitiPhotoMapper.toResponses(entity.photos),
			distance: entity.distance,
		};

		return response;
	},
	toResponses: (entities: GraffitiEntity[]) => {
		return entities.map((entity) => GraffitiMapper.toResponse(entity));
	},
};

export default GraffitiMapper;
