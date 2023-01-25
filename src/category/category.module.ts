import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { AuthService } from '../auth/auth.service';

@Module({
	imports: [ConfigModule],
	providers: [CategoryService, AuthService],
	controllers: [CategoryController],
})
export class CategoryModule {}
