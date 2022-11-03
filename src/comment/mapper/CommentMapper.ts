import { CommentResponseDto } from "../dto/response/comment-response.dto";
import { CommentEntity } from "../entities/comment.entity";

const CommentMapper = {
	toEntity: () => {},

	toResponse: (entity: CommentEntity) => {
		let response: CommentResponseDto = {
			id: entity.id,
			body: entity.body,
			userId: entity.userId,
			graffitiId: entity.graffitiId,
		};

		return response;
	},
	toResponses: (entities: CommentEntity[]) => {
		return entities.map((entity) => CommentMapper.toResponse(entity));
	},
};

export default CommentMapper;
