import { Module } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { TenantsController } from './tenants.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module'; // اگر قبلاً وجود دارد

@Module({
  imports: [
    AuthModule,            // این module باید JwtService را export کند
    JwtModule.register({}), // اضافه کردن JwtModule به TenantsModule
  ],
  controllers: [TenantsController],
  providers: [TenantsService, PrismaService],
  exports: [TenantsService],
})
export class TenantsModule {}