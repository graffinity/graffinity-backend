import { PartialType } from "@nestjs/mapped-types";
import { CreateGraffitiDto } from "./create-graffiti.dto";

export class UpdateGraffitiDto extends PartialType(CreateGraffitiDto) {}
