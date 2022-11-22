import { ReportResponseDto } from '../dto/response/report-response.dto';
import { ReportEntity } from '../entities/report.entity';

const ReportMapper = {
	toEntity: () => {},

	toResponse: (entity: ReportEntity) => {
		let response: ReportResponseDto = {
			id: entity.id,
			graffitiId: entity.graffitiId,
			userId: entity.userId,
			reportReason: entity.reportReason,
			status: entity.status,
		};

		return response;
	},
	toResponses: (entities: ReportEntity[]) => {
		return entities.map((entity) => ReportMapper.toResponse(entity));
	},
};

export default ReportMapper;
