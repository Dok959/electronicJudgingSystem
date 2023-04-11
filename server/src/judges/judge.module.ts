import { JudgeService } from './judge.service';
import { JudgeController } from './judge.controller';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [JudgeController],
  providers: [JudgeService, PrismaService],
})
export class JudgeModule {}
