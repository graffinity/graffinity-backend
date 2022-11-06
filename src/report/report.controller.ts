import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/request/create-report.dto';
import { UpdateReportDto } from './dto/request/update-report.dto';

@ApiTags("report")
@Controller("api/v1/report")
//@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  @ApiOperation({ summary: "Create a graffiti post" })
  create(@Body() createReportDto: CreateReportDto) {
    return this.reportService.create(createReportDto);
  }

  @Get()
  @ApiOperation({ summary: "Find all reports" })
  findAll() {
    return this.reportService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "Find a report by id" })
  findOne(@Param('id') id: string) {
    return this.reportService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    return this.reportService.update(+id, updateReportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reportService.delete(+id);
  }
}
