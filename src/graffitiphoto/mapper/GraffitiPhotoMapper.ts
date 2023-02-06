import { Likes } from '@prisma/client';
import { GraffitiPhotoResponseDto } from '../dto/response/graffitiphoto.response.dto';
import { GraffitiPhotoEntity } from '../entities/graffitiphoto.entity';

const GraffitiPhotoMapper = {
	toResponse: (entity: GraffitiPhotoEntity & { likes?: Likes[] }) => {
		let response: GraffitiPhotoResponseDto = {
			id: entity.id,
			graffitiId: entity.graffitiId,
			url: entity.url,
			userId: entity.userId,
			pictureScore: entity.pictureScore,
			addedAt: entity.createdAt,
			likes: entity.likes ? entity.likes : [],
		};

		return response;
	},
	toResponses: (entities: GraffitiPhotoEntity[] & { likes?: Likes[] }) => {
		return entities.map((entity) => GraffitiPhotoMapper.toResponse(entity));
	},
};

export default GraffitiPhotoMapper;
