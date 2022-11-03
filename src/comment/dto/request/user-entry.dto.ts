import { ApiProperty } from "@nestjs/swagger";

export class UserEntry {
    @ApiProperty()
    userId: number;
}