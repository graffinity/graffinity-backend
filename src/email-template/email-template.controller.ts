import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmailTemplateService } from './email-template.service';
import { CreateEmailTemplateDto } from './dto/create-email-template.dto';
import { UpdateEmailTemplateDto } from './dto/update-email-template.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("email-template")
@Controller("api/v1/graffiti")
export class EmailTemplateController {
  constructor(private readonly emailTemplateService: EmailTemplateService) {}

  @Post()
  @ApiOperation({ summary: "email tamplate  creation" })
  create(@Body() createEmailTemplateDto: CreateEmailTemplateDto) {
    return this.emailTemplateService.create(createEmailTemplateDto);
  }

  @Get()
  @ApiOperation({ summary: "Find all email tamplates " })
  findAll() {
    return this.emailTemplateService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "Find a email template by id" })
  findOne(@Param('id') id: string) {
    return this.emailTemplateService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: "Update a email  tamplate by its id" })
  update(@Param('id') id: string, @Body() updateEmailTemplateDto: UpdateEmailTemplateDto) {
    return this.emailTemplateService.update(+id, updateEmailTemplateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Delete a email tamplate by id" })
  remove(@Param('id') id: string) {
    return this.emailTemplateService.remove(+id);
  }
}
