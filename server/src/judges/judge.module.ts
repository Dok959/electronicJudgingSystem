import { Module } from '@nestjs/common';
import { JudgeService } from './judge.service';
import { JudgeController } from './judge.controller';
import { PrismaService } from 'src/prisma.service';
import { UsersModule } from 'src/users';

@Module({
  imports: [UsersModule],
  controllers: [JudgeController],
  providers: [JudgeService, PrismaService],
})
export class JudgeModule {}
