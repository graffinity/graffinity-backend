import { ApiProperty } from "@nestjs/swagger";
import { Report } from "@prisma/client";

export class ReportEntity implements Report {
    @ApiProperty()
	id: number;

    @ApiProperty()
    graffitiId: number;

    @ApiProperty()
    userId: number;

    @ApiProperty()
	createdAt: Date;
    
    @ApiProperty()
    reportReason: string;

    @ApiProperty()
    status: string;

    @ApiProperty()
    comment: string | null;
}
