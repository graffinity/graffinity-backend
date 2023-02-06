import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserRoleService } from '../userrole/userrole.service';
import { UserRoleModule } from '../userrole/userrole.module';

@Module({
	imports: [PrismaModule, AuthModule, UserRoleModule],
	controllers: [CommentController],
	providers: [
		CommentService,
		AuthService,
		UserService,
		JwtService,
		UserRoleService,
	],
})
export class CommentModule {}
