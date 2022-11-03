import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmailTemplateService } from './email-template.service';
import { CreateEmailTemplateDto } from './dto/request/create-email-template.dto';
import { UpdateEmailTemplateDto } from './dto/request/update-email-template.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import EmailTemplateMapper from './mapper/EmailTemplateMapper';

@ApiTags('email-template')
@Controller('api/v1/emailTemplate')
export class EmailTemplateController {
	constructor(private readonly emailTemplateService: EmailTemplateService) {}

	@Post()
	@ApiOperation({ summary: 'email tamplate  creation' })
	create(@Body() createEmailTemplateDto: CreateEmailTemplateDto) {
		return this.emailTemplateService.create(createEmailTemplateDto);
	}

	@Get()
	@ApiOperation({ summary: 'Find all email templates ' })
	async findAll() {
		let entities = await this.emailTemplateService.findAll();
		return EmailTemplateMapper.toResponses(entities);
	}
	@Get(':id')
	@ApiOperation({ summary: 'Find an email template by id' })
	async findOne(@Param('id') id: string) {
		let entity = await this.emailTemplateService.findOne(+id);
		return EmailTemplateMapper.toResponse(entity);
	}

	@Patch(':id')
	@ApiOperation({ summary: 'Update a email  tamplate by its id' })
	async update(
		@Param('id') id: string,
		@Body() updateEmailTemplateDto: UpdateEmailTemplateDto,
	) {
		let entity = await this.emailTemplateService.update(
			+id,
			updateEmailTemplateDto,
		);
		return EmailTemplateMapper.toResponse(entity);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete a email tamplate by id' })
	async delete(@Param('id') id: string) {
		let entity = await this.emailTemplateService.delete(+id);
		return EmailTemplateMapper.toResponse(entity);
	}
}
