import { PartialType } from '@nestjs/swagger';
import {ApiProperty } from "@nestjs/swagger"
import { CreateArtistDto } from './create-artist.dto';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {
    @ApiProperty({
        type: Number,
        description: "Id is a required value",
    })
    id: number;
    
    @ApiProperty({
		type: String,
		description: "Name is required and must be unique",
	})
	name: string;

    @ApiProperty({
		type: String,
		description: "Surname is required and must be unique",
	})
	surname: string;
}
