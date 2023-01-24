import { Category } from '@prisma/client';
import { CategoryResponseDto } from '../dto/response/category-response.dto';

const CategoryMapper = {
	toResponse: (entity: Category) => {
		let response: CategoryResponseDto = {
			id: entity.id,
			name: entity.name,
		};

		return response;
	},

	toResponses: (entities: Category[]) => {
		return entities.map((entity) => CategoryMapper.toResponse(entity));
	},
};

export default CategoryMapper;
