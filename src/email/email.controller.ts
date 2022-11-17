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
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('email')
@Controller('api/v1/email')
export class EmailController {
	constructor(private readonly emailService: EmailService) {}

	@Post()
	@ApiOperation({ summary: 'email creation' })
	create(@Body() createEmailDto: CreateEmailDto) {
		return this.emailService.create(createEmailDto);
	}

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

	@Patch(':id')
	@ApiOperation({ summary: 'Update an email by its id' })
	update(@Param('id') id: string, @Body() updateEmailDto: UpdateEmailDto) {
		return this.emailService.update(+id, updateEmailDto);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete an email by id' })
	remove(@Param('id') id: string) {
		return this.emailService.remove(+id);
	}
}
