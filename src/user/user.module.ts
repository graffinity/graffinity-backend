import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UserRoleModule } from '../userrole/userrole.module';
import { UserRoleService } from '../userrole/userrole.service';

@Module({
	imports: [PrismaModule, UserRoleModule],
	controllers: [UserController],
	providers: [UserService, UserRoleService],
})
export class UserModule {}
