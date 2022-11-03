import { EmailTemplateResponseDto } from '../dto/response/email-template-response.dto';
import { EmailTemplateEntity } from '../entities/email-template.entity';

const EmailTemplateMapper = {
	toEntity: () => {},

	toResponse: (entity: EmailTemplateEntity) => {
		let response: EmailTemplateResponseDto = {
			id: entity.id,
			name: entity.name,
			subject: entity.subject,
			body: entity.body,
		};

		return response;
	},
	toResponses: (entities: EmailTemplateEntity[]) => {
		return entities.map((entity) => EmailTemplateMapper.toResponse(entity));
	},
};

export default EmailTemplateMapper;
