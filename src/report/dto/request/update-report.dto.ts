import { PartialType } from '@nestjs/swagger';
import { ApiProperty } from "@nestjs/swagger";
import { CreateReportDto } from './create-report.dto';

export class UpdateReportDto extends PartialType(CreateReportDto) {
    @ApiProperty({
		type: Number,
		description: "Id is a required value",
	})
	id: number;

    @ApiProperty({
        type: Number,
        description: "The graffitiId of a report is a required value",
    })
    graffitiId: number;

    @ApiProperty({
        type: Number,
        description: "The userId of a report is a required value",
    })
    userId: number;

    @ApiProperty({
		type: Date,
		description:
			"The date of creation of a report is provided as a timestamp and is required",
		default: new Date(),
	})
	createdAt: Date;
    
    @ApiProperty({
        type: String,
        description: "The reportReason is a required value",
    })
    reportReason: string;

    @ApiProperty({
        type: String,
        description: "The status of a report is a required value",
    })
    status: string;

    // @ApiProperty({
    //     type: String,
    //     description: "The comment of a report is not a required value",
    // })
    // comment: string?;
}
