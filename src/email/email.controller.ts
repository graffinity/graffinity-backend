import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('email')
@Controller('api/v1/email')
export class EmailController {
	constructor(private readonly emailService: EmailService) {}

	@Get()
	@ApiOperation({ summary: 'Find all emails' })
	findAll() {
		return this.emailService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Find an email by id' })
	findOne(@Param('id') id: string) {
		return this.emailService.findOne(+id);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete an email by id' })
	remove(@Param('id') id: string) {
		return this.emailService.remove(+id);
	}
}
