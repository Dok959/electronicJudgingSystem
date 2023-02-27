import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth';
import { RankModule } from 'src/ranks';

@Module({
  imports: [AuthModule, RankModule],
  controllers: [EventController],
  providers: [EventService, PrismaService],
})
export class EventModule {}
