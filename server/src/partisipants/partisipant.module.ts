import { Module } from '@nestjs/common';
import { PartisipantService } from './partisipant.service';
import { PartisipantController } from './partisipant.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [PartisipantController],
  providers: [PartisipantService, PrismaService],
})
export class PartisipantModule {}
