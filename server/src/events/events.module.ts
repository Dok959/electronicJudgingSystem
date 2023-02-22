import { EventsService } from './events.service';
import { EventsController } from './events.controller';

import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { RankModule } from 'src/ranks/rank.module';

@Module({
  imports: [AuthModule, RankModule],
  controllers: [EventsController],
  providers: [EventsService, PrismaService],
})
export class EventsModule {}
