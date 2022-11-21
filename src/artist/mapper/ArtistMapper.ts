import { ArtistEntity } from '../entities/artist.entity';
import { ArtistResponseDto } from '../dto/response/artist-response.dto';

const ArtistMapper = {
	toResponse: (entity: ArtistEntity) => {
		let response: ArtistResponseDto = {
			id: entity.id,
			name: entity.name,
			surname: entity.surname,
		};

		return response;
	},
	toResponses: (entities: ArtistEntity[]) => {
		return entities.map((entity) => ArtistMapper.toResponse(entity));
	},
};

export default ArtistMapper;
