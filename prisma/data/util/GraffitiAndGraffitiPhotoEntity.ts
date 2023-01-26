import { GraffitiPhoto } from '@prisma/client';
import { CreateGraffitiDto } from '../../../src/graffiti/dto/request/create-graffiti.dto';

export class GraffitiAndGraffitiPhotoCreateDto {
	graffiti: CreateGraffitiDto;
	graffitiPhotos: GraffitiPhoto[];
}
