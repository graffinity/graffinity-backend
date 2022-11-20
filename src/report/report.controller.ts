import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateReportDto } from './dto/request/create-report.dto';
import { UpdateReportDto } from './dto/request/update-report.dto';
import { ReportService } from './report.service';
import ReportMapper from "./mapper/ReportMapper";


@ApiTags("report")
@Controller("api/v1/report")
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  @ApiOperation({ summary: "Create a report" })
  create(@Body() createReportDto: CreateReportDto) {
    return this.reportService.create(createReportDto);
  }

  @Get()
  @ApiOperation({ summary: "Find all reports" })
  async findAll() {
    let entities = await this.reportService.findAll();
		return ReportMapper.toResponses(entities);
  }

  @Get(':id')
  @ApiOperation({ summary: "Find a report by id" })
  async findOne(@Param('id') id: string) {
    let entity = await this.reportService.findOne(+id);
		return ReportMapper.toResponse(entity);
  }


  @Put(":id")
	@ApiOperation({ summary: "Update a report by id" })
	async update(
		@Param("id") id: string,
		@Body() updateReportDto: UpdateReportDto,
	) {
		let entity = await this.reportService.update(+id, updateReportDto);
		return ReportMapper.toResponse(entity);
	}

  @Delete(':id')
  @ApiOperation({ summary: "Delete a report by id" })
  async delete(@Param("id") id: string) {
		let entity = await this.reportService.delete(+id);
		return ReportMapper.toResponse(entity);
	}
}
