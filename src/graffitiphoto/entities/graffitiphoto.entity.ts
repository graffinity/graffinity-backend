import { ApiProperty } from "@nestjs/swagger";
import { GraffitiPhoto } from "@prisma/client";



export class GraffitiPhotoEntity implements GraffitiPhoto {
	

	@ApiProperty()
	id: number;

	@ApiProperty()
	graffitiId: number;

	@ApiProperty()
	url: string;

	@ApiProperty()
	addedAt: Date;

}
//cia kazkas netaip turbut