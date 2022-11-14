import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateEmailDto } from './create-email.dto';

export class UpdateEmailDto extends PartialType(CreateEmailDto) {
    @ApiProperty({
        type: Number,
        description: "Id is a required value",
    })
    id: number;
    @ApiProperty({
        type: Date,
        description: "Date is a required value",
    })
    dateSent: Date;
    @ApiProperty({
        type: String,
        description: "Subject is a idk what value",
    })
    subject: string;
    @ApiProperty({
        type: String,
        description: "What kind of type email will be",
    })
    body: string;
    @ApiProperty({
        type: String,
        description: "the status of an email",
    })
    status: string;
}
