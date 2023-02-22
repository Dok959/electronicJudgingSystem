import { PrismaService } from 'src/prisma.service';
import { RankService } from './rank.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [RankService, PrismaService],
  exports: [RankService],
})
export class RankModule {}
