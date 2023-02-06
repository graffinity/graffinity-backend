import { Controller, Get, Param } from '@nestjs/common';
import { UserRoleService } from './userrole.service';
import { RoleEnum } from '@prisma/client';

@Controller('/api/v1/userrole')
export class UserRoleController {
	constructor(private userRoleService: UserRoleService) {}
	@Get()
	async findAll() {
		return await this.userRoleService.findAll();
	}

	@Get('/:id')
	async findById(@Param() id: number) {
		return await this.userRoleService.findById(id);
	}

	@Get('/:name')
	async findByName(@Param() name: string) {
		return await this.userRoleService.findByName(name);
	}
}
