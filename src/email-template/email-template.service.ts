import { Injectable } from '@nestjs/common';
import { rmdirSync } from 'fs';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmailTemplateDto } from './dto/create-email-template.dto';
import { UpdateEmailTemplateDto } from './dto/update-email-template.dto';

@Injectable()
export class EmailTemplateService {
  constructor(private prisma: PrismaService) {}

  create(createEmailTemplateDto: CreateEmailTemplateDto) {
    return this.prisma.emailTemplate.create({data: createEmailTemplateDto});
  }

  findAll() {
    return this.prisma.emailTemplate.findMany();
  }

  findOne(id: number) {
    return this.prisma.emailTemplate.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateEmailTemplateDto: UpdateEmailTemplateDto) {
    return this.prisma.emailTemplate.update({
      where: {
        id: id,
      },
      data: updateEmailTemplateDto,
    });
  }

  remove(id: number) {
    return this.prisma.emailTemplate.delete({
      where: {
        id: id,
      },
    });
  }
  findAllFilteredBy() {
		return this.prisma.emailTemplate.findMany({});
	}
}
