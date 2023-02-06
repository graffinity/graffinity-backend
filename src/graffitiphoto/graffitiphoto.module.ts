import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { PrismaModule } from '../prisma/prisma.module';
import { S3Module } from '../s3/S3module';
import S3Service from '../s3/S3service';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { GraffitiPhotoController } from './graffitiphoto.controller';
import { GraffitiPhotoService } from './graffitiphoto.service';
import { UserRoleService } from '../userrole/userrole.service';
import { UserRoleModule } from '../userrole/userrole.module';

@Module({
	imports: [
		PrismaModule,
		S3Module,
		AuthModule,
		UserModule,
		JwtModule,
		UserRoleModule,
	],
	providers: [
		GraffitiPhotoService,
		S3Service,
		AuthService,
		UserRoleService,
		UserService,
		JwtService,
	],
	controllers: [GraffitiPhotoController],
})
export class GraffitiPhotoModule {}
