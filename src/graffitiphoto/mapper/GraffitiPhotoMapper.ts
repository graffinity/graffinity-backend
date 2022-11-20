import { GraffitiPhotoResponseDto } from "../dto/response/graffitiphoto.response.dto";
import { GraffitiPhotoEntity } from "../entities/graffitiphoto.entity";

const GraffitiPhotoMapper = {
	toEntity: () => {},

	toResponse: (entity: GraffitiPhotoEntity) => {
		let response: GraffitiPhotoResponseDto = {
			id: entity.id,
			graffitiId: entity.graffitiId,
			url: entity.url,
			
		};

		return response;
	},
	toResponses: (entities: GraffitiPhotoEntity[]) => {
		return entities.map((entity) => GraffitiPhotoMapper.toResponse(entity));
	},
};

export default GraffitiPhotoMapper;
