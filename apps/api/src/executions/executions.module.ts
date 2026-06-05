import { Module } from '@nestjs/common';
import { ExecutionsService } from './executions.service';
import { ExecutionsController } from './executions.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module'; // اضافه کنید

@Module({
  imports: [
    AuthModule, // حتما اینجا اضافه شود تا JwtService و JwtAuthGuard پیدا شوند
  ],
  controllers: [ExecutionsController],
  providers: [ExecutionsService,    PrismaService],
  exports: [ExecutionsService],
})
export class ExecutionsModule {}