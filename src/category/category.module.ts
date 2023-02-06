import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { UserRoleModule } from '../userrole/userrole.module';
import { UserRoleService } from '../userrole/userrole.service';

@Module({
	imports: [ConfigModule, AuthModule, UserModule, UserRoleModule],
	providers: [
		CategoryService,
		AuthService,
		UserService,
		JwtService,
		UserRoleService,
	],
	controllers: [CategoryController],
})
export class CategoryModule {}
