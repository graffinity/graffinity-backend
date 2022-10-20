import { PartialType } from "@nestjs/mapped-types";
import { CreateCategoryDto } from "./create-category.dto";

<<<<<<< HEAD
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
	id: number;
}
=======
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
>>>>>>> 50536a2fae52c1cc6f8472f44a50951e45a1eb3c
