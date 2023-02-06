import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { GraffitiPhotoModule } from '../graffitiphoto/graffitiphoto.module';
import { GraffitiPhotoService } from '../graffitiphoto/graffitiphoto.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { S3Module } from '../s3/S3module';
import S3Service from '../s3/S3service';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { GraffitiController } from './graffiti.controller';
import { GraffitiService } from './graffiti.service';
import { UserRoleModule } from '../userrole/userrole.module';
import { UserRoleService } from '../userrole/userrole.service';

@Module({
	imports: [
		PrismaModule,
		S3Module,
		AuthModule,
		UserModule,
		UserRoleModule,
		JwtModule,
		GraffitiPhotoModule,
	],
	providers: [
		PrismaService,
		JwtService,
		GraffitiService,
		S3Service,
		AuthService,
		UserService,
		GraffitiPhotoService,
		UserRoleService,
	],
	controllers: [GraffitiController],
})
export class GraffitiModule {}
