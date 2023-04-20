import { Module } from '@nestjs/common';
import { JudgeService } from './judge.service';
import { JudgeController } from './judge.controller';
import { PrismaService } from 'src/prisma.service';
import { UsersModule } from 'src/users';
import { PartisipantModule } from 'src/partisipants/partisipant.module';

@Module({
  imports: [UsersModule, PartisipantModule],
  controllers: [JudgeController],
  providers: [JudgeService, PrismaService],
})
export class JudgeModule {}
