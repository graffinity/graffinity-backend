import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Module({
	imports: [ConfigModule, AuthModule],
	providers: [CategoryService, AuthService, UserService, JwtService],
	controllers: [CategoryController],
})
export class CategoryModule {}
