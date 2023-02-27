import { Module } from '@nestjs/common';
import { RankService } from './rank.service';
import { RankController } from './rank.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [RankController],
  providers: [RankService, PrismaService],
  exports: [RankService],
})
export class RankModule {}
