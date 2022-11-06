import { ApiProperty } from "@nestjs/swagger";

export class Report {
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

    // @ApiProperty()
    // comment: string?;
}
