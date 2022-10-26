import { ApiProperty } from "@nestjs/swagger";
import { EmailTemplate } from "@prisma/client";

export class EmailTemplateEntity implements EmailTemplate {
    @ApiProperty()
    name: string;

    @ApiProperty()
    id: number;

    @ApiProperty()
    subject: string;

    @ApiProperty()
    body: string;

}
