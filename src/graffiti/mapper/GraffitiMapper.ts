import { GraffitiResponseDto } from "../dto/response/graffiti-response.dto";
import { GraffitiEntity } from "../entities/graffiti.entity";

const GraffitiMapper = {
	toEntity: () => {},

	toResponse: (entity: GraffitiEntity) => {
		let response: GraffitiResponseDto = {
			id: entity.id,
			name: entity.name,
			description: entity.description,
			location: entity.location,
			authorId: entity.authorId,
		};

		return response;
	},
	toResponses: (entities: GraffitiEntity[]) => {
		return entities.map((entity) => GraffitiMapper.toResponse(entity));
	},
};

export default GraffitiMapper;
