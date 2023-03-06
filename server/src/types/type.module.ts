import { TypeService } from './type.service';
import { TypeController } from './type.controller';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth';

@Module({
  imports: [AuthModule],
  controllers: [TypeController],
  providers: [TypeService, PrismaService],
})
export class TypeModule {}
