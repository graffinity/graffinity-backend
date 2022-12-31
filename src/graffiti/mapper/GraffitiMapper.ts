import { Graffiti, GraffitiPhoto } from '@prisma/client';
import GraffitiPhotoMapper from '../../graffitiphoto/mapper/GraffitiPhotoMapper';
import { GraffitiResponseDto } from '../dto/response/graffiti-response.dto';
import { GraffitiEntity } from '../entities/graffiti.entity';

const GraffitiMapper = {
	toResponse: (
		entity:
			| Graffiti & {
					photos: GraffitiPhoto[];
			  },
	) => {
		let response: GraffitiResponseDto = {
			id: entity.id,
			name: entity.name,
			description: entity.description,
			location: entity.location,
			authorId: entity.authorId,
			creationDate: entity.createdAt,
			photos: GraffitiPhotoMapper.toResponses(entity.photos),
		};

		return response;
	},
	toResponses: (
		entities: (Graffiti & {
			photos: GraffitiPhoto[];
		})[],
	) => {
		return entities.map((entity) => GraffitiMapper.toResponse(entity));
	},
};

export default GraffitiMapper;
