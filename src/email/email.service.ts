import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';

@Injectable()
export class EmailService {
  constructor(private prisma: PrismaService) {}
  
  create(createEmailDto: CreateEmailDto) {
    return this.prisma.email.create({data: createEmailDto});
  }

  findAll() {
    return   this.prisma.email.findMany();
  }

  findOne(id: number) {
    return this.prisma.email.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateEmailDto: UpdateEmailDto) {
    return this.prisma.email.update({
      where: {
        id: id,
      },
      data: updateEmailDto,
    });
  }

  remove(id: number) {
    return this.prisma.email.delete({
      where: {
        id: id,
      },
    });
  }
  findAllFilteredBy() {
		return this.prisma.email.findMany({});
	}
}
